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
}

export default function Integrations({ config, onConfigChange, userId }: IntegrationsProps) {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [serviceId, setServiceId] = useState(config.emailjsServiceId || '');
  const [templateId, setTemplateId] = useState(config.emailjsTemplateId || '');
  const [publicKey, setPublicKey] = useState(config.emailjsPublicKey || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const emailConfig = { serviceId, templateId, publicKey };
    const { error } = await supabase
      .from('quiz_configs')
      .update({ webhook_url: webhookUrl, email_config: emailConfig as any })
      .eq('client_id', userId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, webhookUrl, emailjsServiceId: serviceId, emailjsTemplateId: templateId, emailjsPublicKey: publicKey } : prev);
      toast({ title: 'Changes saved', description: 'Your integration settings have been updated.' });
    }
    setSaving(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Integrations</h1>

      <div className="max-w-[600px] space-y-10">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Webhook (CRM Integration)</h2>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input id="webhookUrl" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="e.g. https://hooks.zapier.com/..." />
            <p className="text-xs text-muted-foreground">When a prospect completes your quiz, their details will be sent to this URL automatically. Works with Zapier, Make, HubSpot, and most CRMs.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Email Notifications</h2>
          <div className="space-y-2">
            <Label htmlFor="serviceId">EmailJS Service ID</Label>
            <Input id="serviceId" value={serviceId} onChange={(e) => setServiceId(e.target.value)} placeholder="e.g. service_abc123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="templateId">EmailJS Template ID</Label>
            <Input id="templateId" value={templateId} onChange={(e) => setTemplateId(e.target.value)} placeholder="e.g. template_xyz789" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publicKey">EmailJS Public Key</Label>
            <Input id="publicKey" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} placeholder="e.g. user_Ab1Cd2Ef3Gh4" />
          </div>
          <p className="text-xs text-muted-foreground">Used to send personalised result emails to prospects. Get these from your EmailJS dashboard at emailjs.com</p>
        </section>

        <Button onClick={handleSave} disabled={saving} className="text-white" style={{ backgroundColor: '#C9A96E' }}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
