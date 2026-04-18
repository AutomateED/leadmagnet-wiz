import * as Sentry from "npm:@sentry/deno";

Sentry.init({
  dsn: Deno.env.get("SENTRY_DSN"),
  environment: "production",
  tracesSampleRate: 0.1,
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ADMIN_EMAIL = 'hello@pretaquiz.com'
const SITE_URL = 'https://pretaquiz.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateSlug(email: string): string {
  const rand = Math.random().toString(36).substring(2, 8)
  const prefix = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase()
  return `${prefix}-${rand}`
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

    // Verify admin via getUser
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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const { action, ...payload } = body

    switch (action) {
      case 'grant_access': {
        const { email, full_name, business_name } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })

        // inviteUserByEmail creates the auth user AND sends the email automatically
        const { data: inviteData, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
          data: { full_name: full_name || '' },
          options: { redirectTo: `${SITE_URL}/reset-password` },
        })
        if (inviteErr) throw inviteErr

        const userId = inviteData.user.id

        await supabase.from('clients').insert({
          id: userId,
          email,
          business_name: business_name || '',
          subscription_status: 'active',
        })

        const slug = generateSlug(email)
        await supabase.from('quiz_configs').insert({
          client_id: userId,
          slug,
          template_type: 'custom',
          quiz_name: business_name ? `${business_name} Quiz` : 'My Quiz',
          full_name: full_name || '',
          business_name: business_name || '',
          email,
          brand_colour: '#D946EF',
          questions: [],
          result_texts: {},
          cta_text: 'Book Your Free Discovery Call',
          cta_url: '',
          cta_tagline: '',
          font_family: 'Plus Jakarta Sans',
        })

        return new Response(JSON.stringify({ success: true, message: `Access granted to ${email}`, slug }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'password_reset': {
        const { email } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })
        // resetPasswordForEmail sends the email; generateLink does not
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${SITE_URL}/reset-password`,
        })
        if (error) throw error
        return new Response(JSON.stringify({ success: true, message: `Password reset sent to ${email}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'resend_invite': {
        const { email } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${SITE_URL}/reset-password`,
        })
        if (error) throw error
        return new Response(JSON.stringify({ success: true, message: `Invite resent to ${email}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'toggle_status': {
        const { client_id, status } = payload
        if (!client_id || !status) return new Response(JSON.stringify({ error: 'client_id and status are required' }), { status: 400, headers: corsHeaders })
        const { error } = await supabase.from('clients').update({ subscription_status: status }).eq('id', client_id)
        if (error) throw error
        return new Response(JSON.stringify({ success: true, message: `Status updated to ${status}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'delete_client': {
        const { client_id, email, reason } = payload
        if (!client_id) return new Response(JSON.stringify({ error: 'client_id is required' }), { status: 400, headers: corsHeaders })

        const { data: clientData } = await supabase.from('clients').select('*').eq('id', client_id).single()
        const { data: quizData } = await supabase.from('quiz_configs').select('*').eq('client_id', client_id)
        const { data: leadData } = await supabase.from('leads').select('id').eq('client_id', client_id)

        await supabase.from('archived_clients').insert({
          id: client_id,
          email: email || clientData?.email || '',
          business_name: clientData?.business_name || null,
          subscription_status: clientData?.subscription_status || null,
          admin_notes: clientData?.notes || clientData?.admin_notes || null,
          template_type: quizData?.[0]?.template_type || null,
          lead_count: leadData?.length || 0,
          quiz_configs: quizData as any,
          archived_reason: reason || 'manual_delete',
          created_at: clientData?.created_at || null,
        })

        await supabase.from('quiz_configs').delete().eq('client_id', client_id)
        await supabase.from('leads').delete().eq('client_id', client_id)
        await supabase.from('clients').delete().eq('id', client_id)
        await supabase.auth.admin.deleteUser(client_id)

        return new Response(JSON.stringify({ success: true, message: `Client ${email || client_id} deleted & archived` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'save_notes': {
        const { client_id, notes } = payload
        if (!client_id) return new Response(JSON.stringify({ error: 'client_id is required' }), { status: 400, headers: corsHeaders })
        const { error } = await supabase.from('clients').update({ notes: notes || '' }).eq('id', client_id)
        if (error) throw error
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'list_archived': {
        const { data: archived, error: archErr } = await supabase
          .from('archived_clients')
          .select('*')
          .order('archived_at', { ascending: false })
        if (archErr) throw archErr
        return new Response(JSON.stringify({ success: true, archived: archived || [] }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'restore_client': {
        const { client_id } = payload
        if (!client_id) return new Response(JSON.stringify({ error: 'client_id is required' }), { status: 400, headers: corsHeaders })

        const { data: arch, error: archErr } = await supabase.from('archived_clients').select('*').eq('id', client_id).single()
        if (archErr || !arch) return new Response(JSON.stringify({ error: 'Archived client not found' }), { status: 404, headers: corsHeaders })

        // inviteUserByEmail creates the user AND sends the email in one step
        const { data: newUser, error: createErr } = await supabase.auth.admin.inviteUserByEmail(arch.email, {
          options: { redirectTo: `${SITE_URL}/reset-password` },
        })
        if (createErr) throw createErr
        const newUserId = newUser.user.id

        await supabase.from('clients').insert({
          id: newUserId,
          email: arch.email,
          business_name: arch.business_name || '',
          subscription_status: arch.subscription_status || 'active',
          notes: arch.admin_notes || '',
        })

        const quizConfigs = arch.quiz_configs as any[]
        if (Array.isArray(quizConfigs)) {
          for (const qc of quizConfigs) {
            const { id: _id, client_id: _cid, ...rest } = qc
            await supabase.from('quiz_configs').insert({
              ...rest,
              client_id: newUserId,
            })
          }
        }

        await supabase.from('archived_clients').delete().eq('id', client_id)

        return new Response(JSON.stringify({ success: true, message: `Client ${arch.email} restored` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
  } catch (err) {
    console.error('admin-actions error:', err)
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: corsHeaders
    })
  }
})
