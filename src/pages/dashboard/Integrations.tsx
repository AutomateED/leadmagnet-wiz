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

const zapierSteps = [
  'Go to zapier.com and log in (or create a free account).',
  'Create a new Zap. Click "Create" then "Zaps".',
  'Set your trigger. Search for "Webhooks by Zapier" and select it. Choose "Catch Hook" as the trigger event. Click Continue.',
  'Copy your webhook URL. Zapier will show you a unique URL. Copy it.',
  'Paste it above. Come back here and paste that URL into the field above. Click Save.',
  'Set your action. Back in Zapier, click Continue and choose your CRM (e.g. Mailchimp, HubSpot, GoHighLevel). Map the fields: first_name, last_name, email, result_type.',
  'Test it. Complete your own quiz once. Zapier will detect the test lead — click "Test trigger" to confirm it\'s working. Then publish your Zap.',
];

const makeSteps = [
  'Go to make.com and log in (or create a free account).',
  'Create a new scenario. Click "Create a new scenario".',
  'Add a Webhooks module. Search for "Webhooks" and select "Custom webhook" as your trigger. Click "Add" to create a new webhook.',
  'Copy your webhook URL. Make will generate a URL. Copy it.',
  'Paste it above. Come back here and paste that URL into the field above. Click Save.',
  'Add your CRM module. Click the + button in Make to add your next step. Choose your CRM app and map the fields: first_name, last_name, email, result_type.',
  'Test it. Complete your own quiz once. Click "Run once" in Make — it will pick up the test lead and show you the data came through. Then turn your scenario on.',
];

export default function Integrations({ config, onConfigChange, userId, quizId }: IntegrationsProps) {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'zapier' | 'make'>('zapier');

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

  const steps = activeTab === 'zapier' ? zapierSteps : makeSteps;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>Lead Delivery</h1>
      <p className="mb-8" style={{ color: '#6B5F80' }}>Choose where your leads get sent when someone completes your quiz.</p>

      <div className="max-w-[600px] space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: '#0F0A1E' }}>Send leads to your CRM</h2>

          {/* Tabs */}
          <div className="flex gap-2">
            {(['zapier', 'make'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={
                  activeTab === tab
                    ? { backgroundColor: '#F020B0', color: '#FFFFFF' }
                    : { backgroundColor: 'transparent', color: '#6B5F80', border: '1px solid rgba(217,70,239,0.3)' }
                }
              >
                {tab === 'zapier' ? 'Using Zapier' : 'Using Make'}
              </button>
            ))}
          </div>

          {/* Steps */}
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

          {/* Info box */}
          <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#0F0A1E' }}>Each lead includes:</p>
              <ul className="text-sm list-disc list-inside space-y-0.5" style={{ color: '#6B5F80' }}>
                <li>First name</li>
                <li>Last name</li>
                <li>Email</li>
                <li>Quiz result</li>
                <li>Timestamp</li>
              </ul>
            </div>
          </div>

          {/* Webhook URL input */}
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Your Zapier or CRM webhook URL</Label>
            <Input id="webhookUrl" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="Paste your webhook URL here" />
          </div>
        </section>

        <Button onClick={handleSave} disabled={saving} style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}>
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
