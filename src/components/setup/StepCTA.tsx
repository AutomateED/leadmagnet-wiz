import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

export default function StepCTA({ draft, updateDraft }: StepProps) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">What happens after they get their result?</h2>
      <p className="mt-2 text-muted-foreground">Configure the call-to-action on the results page.</p>

      <div className="mt-8 flex flex-col gap-6">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Button text</span>
          <input
            type="text"
            value={draft.ctaText}
            onChange={(e) => updateDraft({ ctaText: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Book a free discovery call"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Button URL</span>
          <input
            type="url"
            value={draft.ctaUrl}
            onChange={(e) => updateDraft({ ctaUrl: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="https://calendly.com/your-link"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Tagline under the CTA</span>
          <input
            type="text"
            value={draft.ctaTagline}
            onChange={(e) => updateDraft({ ctaTagline: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Ready to break through? Let's talk."
          />
        </label>
      </div>
    </div>
  );
}
