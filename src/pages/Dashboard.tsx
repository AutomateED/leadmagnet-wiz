import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_CONFIG, type QuizConfig } from '@/hooks/useConfig';
import {
  LayoutDashboard, Palette, HelpCircle, Trophy,
  MousePointerClick, Plug, Eye, Share2, LogOut,
} from 'lucide-react';

import Overview from './dashboard/Overview';
import Branding from './dashboard/Branding';
import Questions from './dashboard/Questions';
import Results from './dashboard/Results';
import CtaSettings from './dashboard/CtaSettings';
import Integrations from './dashboard/Integrations';
import QuizPreview from './dashboard/QuizPreview';
import ShareQuiz from './dashboard/ShareQuiz';

const NAV_ITEMS = [
  { label: 'Overview', path: 'overview', icon: LayoutDashboard },
  { label: 'Branding', path: 'branding', icon: Palette },
  { label: 'Questions', path: 'questions', icon: HelpCircle },
  { label: 'Results', path: 'results', icon: Trophy },
  { label: 'CTA Settings', path: 'cta', icon: MousePointerClick },
  { label: 'Integrations', path: 'integrations', icon: Plug },
  { label: 'Preview', path: 'preview', icon: Eye },
  { label: 'Share', path: 'share', icon: Share2 },
];

function generateSlug(email: string): string {
  const local = email.split('@')[0] || 'my-quiz';
  return local.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [slug, setSlug] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setDataLoading(true);
      const { data: existing } = await supabase
        .from('quiz_configs').select('*').eq('client_id', user.id).maybeSingle();

      if (existing) { setConfig(mapRowToConfig(existing)); setSlug(existing.slug); setDataLoading(false); return; }

      const email = user.email || '';
      const slug = generateSlug(email);
      await supabase.from('clients').upsert(
        { id: user.id, email, business_name: DEFAULT_CONFIG.businessName, subscription_status: 'trial' },
        { onConflict: 'id' }
      );
      const { data: newRow } = await supabase.from('quiz_configs').insert({
        client_id: user.id, slug,
        full_name: DEFAULT_CONFIG.fullName, business_name: DEFAULT_CONFIG.businessName,
        email: DEFAULT_CONFIG.email, brand_colour: DEFAULT_CONFIG.brandColour,
        result_texts: DEFAULT_CONFIG.resultTexts as any,
        cta_text: DEFAULT_CONFIG.ctaText, cta_url: DEFAULT_CONFIG.ctaUrl,
        cta_tagline: DEFAULT_CONFIG.ctaTagline, webhook_url: DEFAULT_CONFIG.webhookUrl || '',
        email_config: { serviceId: DEFAULT_CONFIG.emailjsServiceId, templateId: DEFAULT_CONFIG.emailjsTemplateId, publicKey: DEFAULT_CONFIG.emailjsPublicKey } as any,
      }).select().single();
      if (newRow) { setConfig(mapRowToConfig(newRow)); setSlug(newRow.slug); }
      setDataLoading(false);
    })();
  }, [user]);

  if (authLoading || !user || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#D946EF', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <aside className="w-60 shrink-0 flex flex-col" style={{ backgroundColor: '#F8F7FF', borderRight: '1px solid rgba(217,70,239,0.15)' }}>
        <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(217,70,239,0.15)' }}>
          <Link to="/" className="text-[20px] font-bold tracking-tight">
            <span style={{ color: '#0F0A1E' }}>Preta</span><span style={{ color: '#D946EF' }}>Quiz</span>
          </Link>
          <p className="text-sm font-medium truncate mt-1" style={{ color: '#0F0A1E' }}>
            {config?.businessName || 'My Quiz'}
          </p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === `/dashboard/${item.path}`;
            return (
              <Link key={item.path} to={`/dashboard/${item.path}`}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={active
                  ? { backgroundColor: '#F020B0', color: '#FFFFFF' }
                  : { color: '#6B5F80' }
                }
                onMouseEnter={(e) => { if (!active) (e.currentTarget.style.backgroundColor = 'rgba(217,70,239,0.08)'); }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget.style.backgroundColor = 'transparent'); }}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(217,70,239,0.15)' }}>
          <button onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full transition-colors"
            style={{ color: '#6B5F80' }}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview config={config!} slug={slug} />} />
          <Route path="branding" element={<Branding config={config!} onConfigChange={setConfig} userId={user.id} />} />
          <Route path="questions" element={<Questions config={config!} onConfigChange={setConfig} userId={user.id} />} />
          <Route path="results" element={<Results config={config!} onConfigChange={setConfig} userId={user.id} />} />
          <Route path="cta" element={<CtaSettings config={config!} onConfigChange={setConfig} userId={user.id} />} />
          <Route path="integrations" element={<Integrations config={config!} onConfigChange={setConfig} userId={user.id} />} />
          <Route path="preview" element={<QuizPreview slug={slug} config={config!} />} />
          <Route path="share" element={<ShareQuiz slug={slug} />} />
        </Routes>
      </main>
    </div>
  );
}

function mapRowToConfig(row: any): QuizConfig {
  const ec = (row.email_config as any) || {};
  return {
    fullName: row.full_name || '', businessName: row.business_name || '',
    email: row.email || '', logo: row.logo_url || '',
    brandColour: row.brand_colour || '#D946EF',
    fontFamily: row.font_family || 'Plus Jakarta Sans',
    questions: Array.isArray(row.questions) ? row.questions : [],
    resultTexts: (row.result_texts as any) || DEFAULT_CONFIG.resultTexts,
    ctaText: row.cta_text || '', ctaUrl: row.cta_url || '',
    ctaTagline: row.cta_tagline || '', webhookUrl: row.webhook_url || '',
    emailjsServiceId: ec.serviceId || '', emailjsTemplateId: ec.templateId || '',
    emailjsPublicKey: ec.publicKey || '',
  };
}