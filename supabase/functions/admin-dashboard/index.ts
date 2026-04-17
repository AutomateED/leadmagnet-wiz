import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ADMIN_EMAIL = 'hello@pretaquiz.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    // Verify the caller is the admin
    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: userErr } = await supabaseAuth.auth.getUser()
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    if (user.email !== ADMIN_EMAIL) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders })
    }

    // Use service role for admin queries
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Fetch clients
    const { data: clients, error: clientsErr } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (clientsErr) throw clientsErr

    // Fetch quiz configs
    const { data: quizConfigs, error: quizErr } = await supabase
      .from('quiz_configs')
      .select('*')

    if (quizErr) throw quizErr

    // Fetch leads
    const { data: leads, error: leadsErr } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (leadsErr) throw leadsErr

    // Fetch auth users for last_sign_in_at
    const { data: authUsers } = await supabase.auth.admin.listUsers({ perPage: 1000 })

    const authUserMap: Record<string, any> = {}
    if (authUsers?.users) {
      for (const u of authUsers.users) {
        authUserMap[u.id] = u
      }
    }

    // Build client rows with quiz info
    const clientRows = (clients || []).map((c: any) => {
      const quiz = (quizConfigs || []).find((q: any) => q.client_id === c.id)
      const authUser = authUserMap[c.id]
      const questions = quiz?.questions
      const questionsCount = Array.isArray(questions) ? questions.length : 0

      let setupScore = 0
      if (quiz) {
        if (quiz.business_name?.trim()) setupScore++
        if (quiz.logo_url?.trim()) setupScore++
        if (questionsCount > 0) setupScore++
        if (quiz.cta_url?.trim()) setupScore++
        if (quiz.webhook_url?.trim()) setupScore++
      }

      return {
        id: c.id,
        email: c.email,
        business_name: c.business_name,
        subscription_status: c.subscription_status,
        created_at: c.created_at,
        notes: c.notes || '',
        last_login: authUser?.last_sign_in_at || c.last_login || null,
        quiz_slug: quiz?.slug || null,
        template_type: quiz?.template_type || null,
        quiz_name: quiz?.quiz_name || null,
        questions_count: questionsCount,
        setup_score: setupScore,
      }
    })

    const totalClients = clientRows.length
    const activeClients = clientRows.filter((c: any) => c.subscription_status === 'active').length
    const totalLeads = leads?.length || 0
    const zeroQuestionQuizzes = clientRows.filter((c: any) => c.quiz_slug && c.questions_count === 0).length
    const estRevenue = activeClients * 97

    const leadsWithClient = (leads || []).map((l: any) => {
      const quiz = (quizConfigs || []).find((q: any) => q.slug === l.quiz_slug)
      const client = quiz ? (clients || []).find((c: any) => c.id === quiz.client_id) : null
      return {
        ...l,
        client_email: client?.email || null,
        client_business: client?.business_name || null,
      }
    })

    return new Response(JSON.stringify({
      stats: { totalClients, activeClients, totalLeads, zeroQuestionQuizzes, estRevenue },
      clients: clientRows,
      leads: leadsWithClient,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('admin-dashboard error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: corsHeaders
    })
  }
})
