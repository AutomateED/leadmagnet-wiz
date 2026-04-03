import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink, Copy, Globe, Code2 } from 'lucide-react';
import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
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

  const embedCode = `<iframe src="${window.location.origin}" width="100%" height="700" frameborder="0" style="border:none; border-radius:12px;"></iframe>`;
  const directLink = window.location.origin;

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

          {/* How to add to your website */}
          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold text-foreground">Add to your website</h3>
            <p className="mt-1 text-sm text-muted-foreground">Choose one of the two options below to share your quiz.</p>
          </div>

          {/* Option 1: Direct Link */}
          <div className="mt-5 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Option 1: Direct link</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Share this link directly with your audience via email, social media, or a button on your website.
            </p>
            <div className="flex items-center justify-between gap-3 rounded-lg bg-muted p-3">
              <code className="text-xs font-mono text-foreground break-all">
                {directLink}
              </code>
              <CopyButton text={directLink} />
            </div>
          </div>

          {/* Option 2: Embed */}
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Option 2 — Embed on your website</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Paste this code into any page on your website (WordPress, Squarespace, Wix, Kajabi, etc.) where you want the quiz to appear. Look for an "HTML block" or "Custom code" section in your page builder.
            </p>
            <div className="flex items-start justify-between gap-3 rounded-lg bg-muted p-3">
              <code className="text-xs font-mono text-foreground break-all leading-relaxed">
                {embedCode}
              </code>
              <CopyButton text={embedCode} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              💡 <strong>Tip:</strong> You can adjust the <code className="text-xs font-mono bg-muted px-1 rounded">height="700"</code> value if the quiz needs more or less space on your page.
            </p>
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
