import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CtaSettingsProps {
  config: QuizConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<QuizConfig | null>>;
  userId: string;
}

export default function CtaSettings({ config, onConfigChange, userId }: CtaSettingsProps) {
  const { toast } = useToast();
  const [ctaText, setCtaText] = useState(config.ctaText);
  const [ctaUrl, setCtaUrl] = useState(config.ctaUrl);
  const [ctaTagline, setCtaTagline] = useState(config.ctaTagline);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('quiz_configs')
      .update({ cta_text: ctaText, cta_url: ctaUrl, cta_tagline: ctaTagline })
      .eq('client_id', userId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, ctaText, ctaUrl, ctaTagline } : prev);
      toast({ title: 'Changes saved', description: 'Your CTA settings have been updated.' });
    }
    setSaving(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Call to Action</h1>

      <div className="max-w-[600px] space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ctaText">CTA Button Text</Label>
          <Input id="ctaText" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="e.g. Book Your Free Discovery Call" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ctaUrl">CTA Button URL</Label>
          <Input id="ctaUrl" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="e.g. https://calendly.com/your-name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ctaTagline">CTA Tagline</Label>
          <Input id="ctaTagline" value={ctaTagline} onChange={(e) => setCtaTagline(e.target.value)} placeholder="e.g. Ready to break through? Let's talk." />
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="rounded-lg border border-border bg-muted/30 p-6 flex flex-col items-center gap-3">
            {ctaTagline && <p className="text-sm text-muted-foreground text-center">{ctaTagline}</p>}
            <button
              className="px-6 py-2.5 rounded-md text-white text-sm font-medium"
              style={{ backgroundColor: config.brandColour || '#C9A96E' }}
            >
              {ctaText || 'Book Your Free Discovery Call'}
            </button>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="text-white" style={{ backgroundColor: '#C9A96E' }}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
