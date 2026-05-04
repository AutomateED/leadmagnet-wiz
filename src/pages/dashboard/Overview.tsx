import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Circle, Copy, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { DEFAULT_CONFIG } from '@/hooks/useConfig';

interface OverviewProps {
  config: QuizConfig;
  slug: string;
}

const getBaseUrl = () => typeof window !== 'undefined' ? window.location.origin : 'https://pretaquiz.com';


interface Step {
  name: string;
  description: string;
  path: string;
  check: (c: QuizConfig) => boolean;
  optional?: boolean;
}

const STEPS: Step[] = [
  {
    name: 'Add your branding',
    description: 'Set your business name and brand colour so the quiz feels like yours.',
    path: '/dashboard/branding',
    check: (c) => {
      const nameChanged = c.businessName.trim() !== '' && c.businessName.trim() !== DEFAULT_CONFIG.businessName;
      const colourChanged = c.brandColour.trim() !== '' && c.brandColour.trim() !== DEFAULT_CONFIG.brandColour;
      return nameChanged || colourChanged;
    },
  },
  {
    name: 'Upload your logo',
    description: 'Add your logo to appear at the top of your quiz.',
    path: '/dashboard/branding',
    check: (c) => c.logo.trim() !== '',
  },
  {
    name: 'Customise your questions',
    description: 'Edit the quiz questions and answer options to match your audience.',
    path: '/dashboard/questions',
    check: (c) => Array.isArray(c.questions) && c.questions.length > 0,
  },
  {
    name: 'Write your result texts',
    description: 'Craft personalised result descriptions for each outcome type.',
    path: '/dashboard/results',
    check: (c) => {
      const rt = c.resultTexts as Record<string, string> | undefined;
      if (!rt) return false;
      const defaults = DEFAULT_CONFIG.resultTexts as Record<string, string>;
      const keys = Object.values(c.resultTitles || {});
      return keys.some((k) => typeof rt[k] === 'string' && rt[k].trim() !== '' && rt[k] !== defaults[k]);
    },
  },
  {
    name: 'Set your call to action',
    description: 'Add the link where prospects can book a call or take the next step.',
    path: '/dashboard/cta',
    check: (c) => c.ctaUrl.trim() !== '' && c.ctaUrl.trim() !== DEFAULT_CONFIG.ctaUrl,
  },
  {
    name: 'Connect your CRM',
    description: 'Send leads automatically to your CRM or email tool via webhook.',
    path: '/dashboard/integrations',
    check: (c) => (c.webhookUrl ?? '').trim() !== '',
    optional: true,
  },
  {
    name: 'Share your quiz',
    description: 'Grab your link or embed code and start collecting leads.',
    path: '/dashboard/share',
    check: () => false,
    optional: true,
  },
];

export default function Overview({ config, slug }: OverviewProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const quizUrl = `${getBaseUrl()}/quiz/${slug}`;

  const [leadCount, setLeadCount] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', user.id)
      .then(({ count, error }) => {
        if (!error) setLeadCount(count ?? 0);
        else setLeadCount(0);
      });
  }, [user?.id]);

  const requiredSteps = STEPS.filter((s) => !s.optional);
  const completed = requiredSteps.filter((s) => s.check(config)).length;
  const total = requiredSteps.length;
  const pct = Math.round((completed / total) * 100);

  const copyLink = async () => {
    await navigator.clipboard.writeText(quizUrl);
    toast({ title: 'Link copied!' });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold" style={{ color: '#0F0A1E' }}>Welcome to PretaQuiz</h1>
      <p className="mt-1" style={{ color: '#6B5F80' }}>
        Setting up your quiz for{' '}
        <span className="font-medium" style={{ color: '#0F0A1E' }}>{config.businessName || 'Your Business Name'}</span>.
      </p>
      <p className="text-sm mt-3 max-w-[800px]" style={{ color: '#6B5F80' }}>
        You're just a few steps away from having your own lead-generation quiz. Work through the checklist below. Most clients finish in under 30 minutes.
      </p>

      {/* Total Leads stat */}
      {leadCount !== null && (
        <Link
          to="/dashboard/leads"
          className="mt-6 max-w-[800px] rounded-xl p-5 flex items-center gap-4 transition-colors hover:shadow-sm"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(217,70,239,0.15)' }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full shrink-0"
            style={{ backgroundColor: 'rgba(217,70,239,0.12)' }}
          >
            <Users className="h-5 w-5" style={{ color: '#D946EF' }} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: '#0F0A1E' }}>{leadCount}</p>
            <p className="text-sm" style={{ color: '#6B5F80' }}>Total Leads</p>
          </div>
        </Link>
      )}

      {/* Welcome video */}
      <div className="mt-6 max-w-[800px] rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(217,70,239,0.08)' }}>
        <div style={{ position: 'relative', paddingBottom: '55.73%', height: 0 }}>
          <iframe
            src="https://www.loom.com/embed/7a605f6d4d2d41579d3bb6f614983204"
            frameBorder={0}
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Set up your quiz in under 5 minutes"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 max-w-[800px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#0F0A1E' }}>
            {completed} of {total} steps complete
          </span>
          <span className="text-sm" style={{ color: '#9A8EAA' }}>{pct}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(217,70,239,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: '#D946EF' }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-8 max-w-[800px] space-y-3">
        {STEPS.map((step, i) => {
          const done = step.check(config);
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl p-4 transition-colors"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(217,70,239,0.15)' }}
            >
              <div className="mt-0.5 shrink-0">
                {done ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(217,70,239,0.15)' }}>
                    <Check className="h-4 w-4" style={{ color: '#D946EF' }} />
                  </div>
                ) : (
                  <Circle className="h-6 w-6" style={{ color: '#9A8EAA' }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#0F0A1E' }}>
                    {step.name}
                  </span>
                  {step.optional && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide" style={{ backgroundColor: 'rgba(217,70,239,0.08)', color: '#9A8EAA' }}>
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-sm mt-0.5" style={{ color: '#6B5F80' }}>{step.description}</p>
              </div>

              <Link
                to={step.path}
                className="shrink-0 flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
                style={{ color: '#D946EF' }}
              >
                Go to <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quiz link box */}
      <div
        className="mt-8 max-w-[800px] rounded-xl p-5"
        style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}
      >
        <p className="text-sm font-medium mb-2" style={{ color: '#0F0A1E' }}>Your quiz is live at:</p>
        <div className="flex items-center gap-3">
          <a
            href={quizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono break-all hover:underline"
            style={{ color: '#D946EF' }}
          >
            {quizUrl}
          </a>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={copyLink}
            style={{ borderColor: 'rgba(217,70,239,0.30)', color: '#D946EF' }}
          >
            <Copy className="h-4 w-4" /> Copy link
          </Button>
        </div>
      </div>

      {/* Need help */}
      <div className="mt-8 max-w-[800px] rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(217,70,239,0.15)' }}>
        <p className="text-sm font-semibold" style={{ color: '#0F0A1E' }}>Need help setting up?</p>
        <p className="text-sm mt-1" style={{ color: '#6B5F80' }}>
          Email us at{' '}
          <a href="mailto:hello@pretaquiz.com" className="underline hover:opacity-80" style={{ color: '#D946EF' }}>
            hello@pretaquiz.com
          </a>{' '}
          and we'll get you sorted.
        </p>
      </div>
    </div>
  );
}