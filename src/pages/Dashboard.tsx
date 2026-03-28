import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_CONFIG, type QuizConfig } from '@/hooks/useConfig';
import {
  LayoutDashboard, Palette, HelpCircle, Trophy,
  MousePointerClick, Plug, Eye, Share2, LogOut, ArrowLeft,
  Users,
} from 'lucide-react';

import MyQuizzes from './dashboard/MyQuizzes';
import Overview from './dashboard/Overview';
import Branding from './dashboard/Branding';
import Questions from './dashboard/Questions';
import Results from './dashboard/Results';
import CtaSettings from './dashboard/CtaSettings';
import Integrations from './dashboard/Integrations';
import QuizPreview from './dashboard/QuizPreview';
import ShareQuiz from './dashboard/ShareQuiz';
import Leads from './dashboard/Leads';

const NAV_ITEMS = [
  { label: 'Overview', path: 'overview', icon: LayoutDashboard },
  { label: 'Branding', path: 'branding', icon: Palette },
  { label: 'Questions', path: 'questions', icon: HelpCircle },
  { label: 'Results', path: 'results', icon: Trophy },
  { label: 'CTA Settings', path: 'cta', icon: MousePointerClick },
  { label: 'Integrations', path: 'integrations', icon: Plug },
  { label: 'Leads', path: 'leads', icon: Users },
  { label: 'Preview', path: 'preview', icon: Eye },
  { label: 'Share', path: 'share', icon: Share2 },
];

interface QuizRow {
  id: string;
  quiz_name: string;
  template_type: string;
  slug: string;
  [key: string]: any;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [quizzes, setQuizzes] = useState<QuizRow[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [slug, setSlug] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  const isOnSubPage = location.pathname !== '/dashboard' && location.pathname !== '/dashboard/';

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  // Fetch all quizzes for this client
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      setDataLoading(true);
      const { data, error } = await supabase
        .from('quiz_configs')
        .select('*')
        .eq('client_id', user.id);

      if (cancelled) return;
      if (error) {
        console.error('Failed to load quizzes:', error);
        setQuizzes([]);
      } else {
        setQuizzes((data as QuizRow[]) || []);
      }
      setDataLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  // Auto-select first quiz when navigating to a sub-route with no selection
  useEffect(() => {
    if (!selectedQuizId && quizzes.length > 0 && isOnSubPage) {
      setSelectedQuizId(quizzes[0].id);
    }
  }, [quizzes, selectedQuizId, isOnSubPage]);

  // When a quiz is selected, derive config & slug
  useEffect(() => {
    if (!selectedQuizId) {
      setConfig(null);
      setSlug('');
      return;
    }
    const row = quizzes.find((q) => q.id === selectedQuizId);
    if (row) {
      setConfig(mapRowToConfig(row));
      setSlug(row.slug);
    }
  }, [selectedQuizId, quizzes]);

  const handleSelectQuiz = useCallback((quizId: string) => {
    setSelectedQuizId(quizId);
    navigate('/dashboard/overview');
  }, [navigate]);

  const handleBackToList = useCallback(() => {
    setSelectedQuizId(null);
    navigate('/dashboard');
  }, [navigate]);

  if (authLoading || !user || dataLoading || (isOnSubPage && !config && quizzes.length > 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#D946EF', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Sidebar — only shown when a quiz is selected and on a sub-page */}
      {selectedQuizId && isOnSubPage && (
        <aside className="w-60 shrink-0 flex flex-col" style={{ backgroundColor: '#F8F7FF', borderRight: '1px solid rgba(217,70,239,0.15)' }}>
          <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(217,70,239,0.15)' }}>
            <Link to="/" className="text-[20px] font-bold tracking-tight">
              <span style={{ color: '#0F0A1E' }}>Preta</span><span style={{ color: '#D946EF' }}>Quiz</span>
            </Link>
            <p className="text-sm font-medium truncate mt-1" style={{ color: '#0F0A1E' }}>
              {config?.quizName || 'My Quiz'}
            </p>
          </div>

          {/* Back to list */}
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-colors hover:bg-white/50"
            style={{ color: '#D946EF', borderBottom: '1px solid rgba(217,70,239,0.10)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            My Quizzes
          </button>

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
      )}

      <main className="flex-1 overflow-auto">
        <Routes>
          <Route
            index
            element={
              <>
                {/* Top bar for list page */}
                <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid rgba(217,70,239,0.10)' }}>
                  <Link to="/" className="text-[20px] font-bold tracking-tight">
                    <span style={{ color: '#0F0A1E' }}>Preta</span><span style={{ color: '#D946EF' }}>Quiz</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    style={{ color: '#6B5F80' }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
                <MyQuizzes quizzes={quizzes} onSelectQuiz={handleSelectQuiz} />
              </>
            }
          />
          {config && (
            <>
              <Route path="overview" element={<Overview config={config} slug={slug} />} />
              <Route path="branding" element={<Branding config={config} onConfigChange={setConfig} userId={user.id} quizId={config.quizId} />} />
              <Route path="questions" element={<Questions config={config} onConfigChange={setConfig} userId={user.id} quizId={config.quizId} />} />
              <Route path="results" element={<Results config={config} onConfigChange={setConfig} userId={user.id} quizId={config.quizId} />} />
              <Route path="cta" element={<CtaSettings config={config} onConfigChange={setConfig} userId={user.id} quizId={config.quizId} />} />
              <Route path="integrations" element={<Integrations config={config} onConfigChange={setConfig} userId={user.id} quizId={config.quizId} />} />
              <Route path="preview" element={<QuizPreview slug={slug} config={config} />} />
              <Route path="leads" element={<Leads />} />
              <Route path="share" element={<ShareQuiz slug={slug} />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

function mapRowToConfig(row: any): QuizConfig {
  const ec = (row.email_config as any) || {};
  return {
    quizId: row.id || '', clientId: row.client_id || '', quizName: row.quiz_name || 'My Quiz',
    templateType: row.template_type || 'business-breakthrough',
    fullName: row.full_name || '', businessName: row.business_name || '',
    email: row.email || '', logo: row.logo_url || '',
    brandColour: row.brand_colour || DEFAULT_CONFIG.brandColour,
    fontFamily: row.font_family || DEFAULT_CONFIG.fontFamily,
    questions: Array.isArray(row.questions) ? row.questions : [],
    resultTexts: (row.result_texts as any) || DEFAULT_CONFIG.resultTexts,
    ctaText: row.cta_text || '', ctaUrl: row.cta_url || '',
    ctaTagline: row.cta_tagline || '', webhookUrl: row.webhook_url || '',
    emailjsServiceId: ec.serviceId || '', emailjsTemplateId: ec.templateId || '',
    emailjsPublicKey: ec.publicKey || '',
  };
}
