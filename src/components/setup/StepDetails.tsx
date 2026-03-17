import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

export default function StepDetails({ draft, updateDraft }: StepProps) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">Let's get started</h2>
      <p className="mt-2 text-muted-foreground">Tell us about you and your business.</p>

      <div className="mt-8 flex flex-col gap-6">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Your full name</span>
          <input
            type="text"
            value={draft.fullName}
            onChange={(e) => updateDraft({ fullName: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Sarah Mitchell"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Your business name</span>
          <input
            type="text"
            value={draft.businessName}
            onChange={(e) => updateDraft({ businessName: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Elevate Coaching Co."
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Your email address</span>
          <input
            type="email"
            value={draft.email}
            onChange={(e) => updateDraft({ email: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="sarah@elevatecoaching.com"
          />
        </label>
      </div>
    </div>
  );
}
