import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface IntegrationsProps {
  config: QuizConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<QuizConfig | null>>;
  userId: string;
  quizId: string;
}

const directSteps = [
  'Log into your CRM and find the "Webhooks" or "Automations" section.',
  'Create a new webhook or incoming webhook trigger. Your CRM will give you a URL.',
  'Copy that URL and paste it into the field below.',
  'Click Save, then complete your own quiz once to send a test lead through.',
  'Check your CRM. The test lead should appear within a few seconds.',
];

const zapierSteps = [
  'Go to zapier.com and log in or create a free account.',
  'Create a new Zap. Click "Create" → "Zaps".',
  'Set your trigger. Search for "Webhooks by Zapier" → select "Catch Hook" → click Continue.',
  'Copy your webhook URL. Zapier shows you a unique URL. Copy it.',
  'Paste it below and click Save.',
  'Add your CRM as the action. Back in Zapier, click Continue and choose your CRM (Mailchimp, HubSpot, Flodesk, etc.). Map the fields: first_name, last_name, email, result_type.',
  'Test it. Complete your own quiz once. In Zapier, click "Test trigger" and your test lead will appear. Then publish your Zap.',
];

const makeSteps = [
  'Go to make.com and log in or create a free account.',
  'Create a new scenario.',
  'Add a Webhooks module. Search "Webhooks" → select "Custom webhook" → click "Add" to generate a URL.',
  'Copy your webhook URL and paste it below. Click Save.',
  'Add your CRM module. Click + in Make and choose your CRM. Map the fields: first_name, last_name, email, result_type.',
  'Test it. Complete your own quiz once. Click "Run once" in Make and your test lead will appear. Turn your scenario on.',
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-xl p-4"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(217,70,239,0.15)' }}
        >
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'rgba(217,70,239,0.12)', color: '#F020B0' }}
          >
            {i + 1}
          </span>
          <span className="text-sm" style={{ color: '#4A4060' }}>{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Integrations({ config, onConfigChange, userId, quizId }: IntegrationsProps) {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [privacyUrl, setPrivacyUrl] = useState(config.privacyPolicyUrl || '');
  const [savingPrivacy, setSavingPrivacy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [situation, setSituation] = useState<'direct' | 'bridge'>('direct');
  const [bridgeTool, setBridgeTool] = useState<'zapier' | 'make'>('zapier');

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('quiz_configs')
      .update({ webhook_url: webhookUrl })
      .eq('id', quizId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, webhookUrl } : prev);
      toast({ title: 'Changes saved', description: 'Your lead delivery settings have been updated.' });
    }
    setSaving(false);
  };

  const handleSavePrivacy = async () => {
    setSavingPrivacy(true);
    const { error } = await supabase
      .from('quiz_configs')
      .update({ privacy_policy_url: privacyUrl } as any)
      .eq('id', quizId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, privacyPolicyUrl: privacyUrl } : prev);
      toast({ title: 'Changes saved', description: 'Your privacy policy URL has been updated.' });
    }
    setSavingPrivacy(false);
  };

  return (
    <div className="p-8">
      {/* GDPR & Privacy section */}
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>GDPR &amp; Privacy</h1>
      <p className="mb-6" style={{ color: '#6B5F80' }}>
        Added to your quiz so prospects can read your privacy policy before submitting their details. Required for GDPR compliance.
      </p>

      <div className="max-w-[600px] mb-12 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="privacyUrl">Your privacy policy URL</Label>
          <Input id="privacyUrl" value={privacyUrl} onChange={(e) => setPrivacyUrl(e.target.value)} placeholder="https://yourwebsite.com/privacy" />
        </div>
        <Button onClick={handleSavePrivacy} disabled={savingPrivacy} style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}>
          {savingPrivacy ? 'Saving...' : 'Save changes'}
        </Button>
        <div
          className="mt-3 rounded-lg px-4 py-3 text-sm leading-relaxed"
          style={{ backgroundColor: 'rgba(217,70,239,0.06)', border: '1px solid rgba(217,70,239,0.15)', color: '#6B5F80' }}
        >
          <span className="font-semibold" style={{ color: '#0F0A1E' }}>Don't have a privacy policy yet?</span>{' '}
          You'll need one before sharing your quiz with prospects.{' '}
          <a
            href="TERMLY_AFFILIATE_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-medium"
            style={{ color: '#D946EF' }}
          >
            Termly
          </a>
          {' '}makes it straightforward — you can generate one in minutes, for free.
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>Lead Delivery</h2>
      <p className="mb-8" style={{ color: '#6B5F80' }}>
        Every time someone completes your quiz, their details can be sent automatically to your CRM or email tool.
      </p>

      <div className="max-w-[600px] space-y-8">
        {/* Section 1 — Situation cards */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold" style={{ color: '#0F0A1E' }}>Which situation are you in?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSituation('direct')}
              className="text-left rounded-xl p-4 transition-colors"
              style={{
                border: situation === 'direct' ? '2px solid #D946EF' : '1px solid rgba(217,70,239,0.15)',
                backgroundColor: situation === 'direct' ? 'rgba(217,70,239,0.06)' : '#FFFFFF',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: '#0F0A1E' }}>My CRM has a webhook URL</p>
              <p className="text-xs mt-1" style={{ color: '#6B5F80' }}>
                e.g. GoHighLevel, ActiveCampaign, and others. Your CRM gives you a URL to paste here directly.
              </p>
            </button>
            <button
              onClick={() => setSituation('bridge')}
              className="text-left rounded-xl p-4 transition-colors"
              style={{
                border: situation === 'bridge' ? '2px solid #D946EF' : '1px solid rgba(217,70,239,0.15)',
                backgroundColor: situation === 'bridge' ? 'rgba(217,70,239,0.06)' : '#FFFFFF',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: '#0F0A1E' }}>I use Mailchimp, or I'm not sure</p>
              <p className="text-xs mt-1" style={{ color: '#6B5F80' }}>
                Use a free tool like Zapier or Make to connect any CRM. Takes about 5 minutes.
              </p>
            </button>
          </div>
        </section>

        {/* Section 2 — Instructions */}
        <section className="space-y-4">
          {situation === 'direct' ? (
            <StepList steps={directSteps} />
          ) : (
            <>
              <div className="flex gap-2">
                {(['zapier', 'make'] as const).map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setBridgeTool(tool)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={
                      bridgeTool === tool
                        ? { backgroundColor: '#F020B0', color: '#FFFFFF' }
                        : { backgroundColor: 'transparent', color: '#6B5F80', border: '1px solid rgba(217,70,239,0.3)' }
                    }
                  >
                    {tool === 'zapier' ? 'Zapier' : 'Make'}
                  </button>
                ))}
              </div>
              <StepList steps={bridgeTool === 'zapier' ? zapierSteps : makeSteps} />
            </>
          )}
        </section>

        {/* Section 3 — Webhook URL + Save */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Your Zapier or CRM webhook URL</Label>
            <Input id="webhookUrl" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="Paste your webhook URL here" />
          </div>
          <Button onClick={handleSave} disabled={saving} style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}>
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </section>

        {/* Section 4 — Info box */}
        <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: '#0F0A1E' }}>What gets sent with each lead:</p>
            <ul className="text-sm list-disc list-inside space-y-0.5" style={{ color: '#6B5F80' }}>
              <li>First name</li>
              <li>Last name</li>
              <li>Email</li>
              <li>Quiz result</li>
              <li>Timestamp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
