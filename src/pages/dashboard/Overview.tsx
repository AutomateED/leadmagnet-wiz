import { Link } from 'react-router-dom';
import { Check, Circle, Copy, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { QuizConfig } from '@/hooks/useConfig';
import { DEFAULT_CONFIG } from '@/hooks/useConfig';

interface OverviewProps {
  config: QuizConfig;
  slug: string;
}

const getBaseUrl = () => typeof window !== 'undefined' ? window.location.origin : 'https://pretaquiz.com';

const RESULT_KEYS = [
  'The Invisible Expert',
  'The Overwhelmed Operator',
  'The Confident Starter',
  'The Plateau Breaker',
];

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
      return RESULT_KEYS.some((k) => typeof rt[k] === 'string' && rt[k].trim() !== '' && rt[k] !== defaults[k]);
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
  },
];

export default function Overview({ config, slug }: OverviewProps) {
  const { toast } = useToast();
  const quizUrl = `${getBaseUrl()}/quiz/${slug}`;

  const completed = STEPS.filter((s) => s.check(config)).length;
  const total = STEPS.length;
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
        <span className="font-medium" style={{ color: '#0F0A1E' }}>{config.businessName || 'your business'}</span>.
      </p>
      <p className="text-sm mt-3 max-w-[800px]" style={{ color: '#6B5F80' }}>
        You're just a few steps away from having your own lead-generation quiz. Work through the checklist below — most clients finish in under 30 minutes.
      </p>

      {/* Welcome video */}
      <div
        className="mt-6 max-w-[800px] rounded-xl overflow-hidden"
        style={{ backgroundColor: 'rgba(217,70,239,0.08)' }}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(217,70,239,0.15)' }}
            >
              <Play className="h-6 w-6 ml-0.5" style={{ color: '#D946EF' }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: '#0F0A1E' }}>Watch: Set up your quiz in under 5 minutes</p>
            <span className="text-xs" style={{ color: '#9A8EAA' }}>Video coming soon</span>
          </div>
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
          <a href="mailto:team@virtualsupport.world" className="underline hover:opacity-80" style={{ color: '#D946EF' }}>
            team@virtualsupport.world
          </a>{' '}
          and we'll get you sorted.
        </p>
      </div>
    </div>
  );
}