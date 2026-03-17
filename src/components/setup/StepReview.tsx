import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

export default function StepReview({ draft, onSave, saved }: StepProps) {
  const rows = [
    { label: 'Name', value: draft.fullName },
    { label: 'Business', value: draft.businessName },
    { label: 'Email', value: draft.email },
    { label: 'Brand colour', value: draft.brandColour },
    { label: 'CTA', value: draft.ctaText },
    { label: 'CTA URL', value: draft.ctaUrl },
    { label: 'Webhook', value: draft.webhookUrl || '—' },
    { label: 'EmailJS', value: draft.emailjsServiceId ? 'Configured' : 'Not set' },
  ];

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">You're ready to go!</h2>
      <p className="mt-2 text-muted-foreground">Review your settings and launch your quiz.</p>

      <div className="mt-8 rounded-xl border border-border bg-card divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className="text-sm font-medium text-foreground truncate ml-4 max-w-[200px]">
              {row.label === 'Brand colour' ? (
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: row.value }}
                  />
                  {row.value}
                </span>
              ) : (
                row.value
              )}
            </span>
          </div>
        ))}
      </div>

      {!saved ? (
        <motion.button
          onClick={onSave}
          className="mt-8 w-full rounded-full px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:shadow-lift active:scale-95"
          style={{ backgroundColor: draft.brandColour }}
          whileTap={{ scale: 0.96 }}
        >
          Save My Quiz
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-2 rounded-full bg-green-50 py-4 text-green-700 font-semibold">
            <Check className="h-5 w-5" />
            Quiz saved successfully!
          </div>

          {/* Embed code */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Embed code</p>
            <code className="block rounded-lg bg-muted p-4 text-xs font-mono text-foreground break-all leading-relaxed">
              {`<iframe src="${window.location.origin}" width="100%" height="700" frameborder="0"></iframe>`}
            </code>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Direct link</p>
            <code className="block rounded-lg bg-muted p-4 text-xs font-mono text-foreground break-all">
              {window.location.origin}
            </code>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            Preview My Quiz
          </a>
        </motion.div>
      )}
    </div>
  );
}
