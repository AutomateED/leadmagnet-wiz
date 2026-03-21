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

export default function Integrations({ config, onConfigChange, userId, quizId }: IntegrationsProps) {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('quiz_configs')
      .update({ webhook_url: webhookUrl })
      .eq('client_id', userId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, webhookUrl } : prev);
      toast({ title: 'Changes saved', description: 'Your lead delivery settings have been updated.' });
    }
    setSaving(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>Lead Delivery</h1>
      <p className="mb-8" style={{ color: '#6B5F80' }}>Choose where your leads get sent when someone completes your quiz.</p>

      <div className="max-w-[600px] space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: '#0F0A1E' }}>Send leads to your CRM</h2>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Your Zapier or CRM webhook URL</Label>
            <Input id="webhookUrl" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="Paste your webhook URL here" />
          </div>

          <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}>
            <p className="text-sm" style={{ color: '#4A4060' }}>
              Not sure what this is? If you use a tool like Zapier, HubSpot, GoHighLevel, or Mailchimp, you can connect it here so every new lead gets added automatically. If you're not sure, skip this for now — you can always add it later.
            </p>
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
        </section>

        <Button onClick={handleSave} disabled={saving} style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}>
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}