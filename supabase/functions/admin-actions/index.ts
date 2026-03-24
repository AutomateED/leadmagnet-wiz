import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ADMIN_EMAIL = 'hello@pretaquiz.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateSlug(template: string): string {
  const rand = Math.random().toString(36).substring(2, 8)
  return `${template}-${rand}`
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

    const supabaseAuth = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: claims, error: claimsErr } = await supabaseAuth.auth.getClaims(authHeader.replace('Bearer ', ''))
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userEmail = (claims.claims as any).email
    if (userEmail !== ADMIN_EMAIL) {
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
        const { email, full_name, business_name, template_type } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })

        // Create auth user with a random password (they'll reset it)
        const tempPassword = crypto.randomUUID()
        const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true,
        })
        if (createErr) throw createErr

        const userId = newUser.user.id

        // Create client row
        await supabase.from('clients').insert({
          id: userId,
          email,
          business_name: business_name || '',
          subscription_status: 'active',
        })

        // Create quiz config
        const slug = generateSlug(template_type || 'business-breakthrough')
        await supabase.from('quiz_configs').insert({
          client_id: userId,
          slug,
          template_type: template_type || 'business-breakthrough',
          quiz_name: business_name ? `${business_name} Quiz` : 'My Quiz',
          full_name: full_name || '',
          business_name: business_name || '',
          email,
        })

        // Send password reset so user can set their own password
        await supabase.auth.admin.generateLink({
          type: 'recovery',
          email,
        })

        return new Response(JSON.stringify({ success: true, message: `Access granted to ${email}`, slug }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'password_reset': {
        const { email } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })
        const { error } = await supabase.auth.admin.generateLink({ type: 'recovery', email })
        if (error) throw error
        return new Response(JSON.stringify({ success: true, message: `Password reset sent to ${email}` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      case 'resend_invite': {
        const { email } = payload
        if (!email) return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400, headers: corsHeaders })
        const { error } = await supabase.auth.admin.generateLink({ type: 'recovery', email })
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
        const { client_id, email } = payload
        if (!client_id) return new Response(JSON.stringify({ error: 'client_id is required' }), { status: 400, headers: corsHeaders })

        // Delete quiz configs first (cascade should handle, but be explicit)
        await supabase.from('quiz_configs').delete().eq('client_id', client_id)
        // Delete leads
        await supabase.from('leads').delete().eq('client_id', client_id)
        // Delete client row
        await supabase.from('clients').delete().eq('id', client_id)
        // Delete auth user
        await supabase.auth.admin.deleteUser(client_id)

        return new Response(JSON.stringify({ success: true, message: `Client ${email || client_id} deleted` }), {
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
