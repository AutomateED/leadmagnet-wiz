import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

export default function StepEmail({ draft, updateDraft }: StepProps) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">Where should leads go?</h2>
      <p className="mt-2 text-muted-foreground">Connect your webhook and email service.</p>

      <div className="mt-8 flex flex-col gap-6">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Webhook URL</span>
          <input
            type="url"
            value={draft.webhookUrl}
            onChange={(e) => updateDraft({ webhookUrl: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="https://hooks.zapier.com/..."
          />
          <span className="text-xs text-muted-foreground">
            Paste your HighLevel, ActiveCampaign, Zapier or Make webhook URL here.
          </span>
        </label>

        <div className="h-px bg-border" />

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">EmailJS Service ID</span>
          <input
            type="text"
            value={draft.emailjsServiceId}
            onChange={(e) => updateDraft({ emailjsServiceId: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="service_xxxxxxx"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">EmailJS Template ID</span>
          <input
            type="text"
            value={draft.emailjsTemplateId}
            onChange={(e) => updateDraft({ emailjsTemplateId: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="template_xxxxxxx"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">EmailJS Public Key</span>
          <input
            type="text"
            value={draft.emailjsPublicKey}
            onChange={(e) => updateDraft({ emailjsPublicKey: e.target.value })}
            className="rounded-lg border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
            placeholder="xxxxxxxxxxxx"
          />
        </label>

        <a
          href="https://emailjs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-foreground"
          style={{ color: 'hsl(var(--primary))' }}
        >
          How to set up EmailJS →
        </a>
      </div>
    </div>
  );
}
