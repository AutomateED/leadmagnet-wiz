import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

const FONT_OPTIONS = [
  { family: 'Playfair Display', label: 'Elegant Serif', fallback: 'serif' },
  { family: 'Montserrat', label: 'Bold Modern', fallback: 'sans-serif' },
  { family: 'Sacramento', label: 'Handwritten Script', fallback: 'cursive' },
] as const;

interface BrandingProps {
  config: QuizConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<QuizConfig | null>>;
  userId: string;
}

export default function Branding({ config, onConfigChange, userId }: BrandingProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessName, setBusinessName] = useState(config.businessName);
  const [fullName, setFullName] = useState(config.fullName);
  const [email, setEmail] = useState(config.email);
  const [brandColour, setBrandColour] = useState(config.brandColour);
  const [logoUrl, setLogoUrl] = useState(config.logo);
  const [fontFamily, setFontFamily] = useState(config.fontFamily || 'Playfair Display');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load all three Google Fonts for preview cards
  useEffect(() => {
    const id = 'branding-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Sacramento&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      toast({ title: 'Invalid file type', description: 'Please upload a PNG, JPG, or SVG file.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${userId}/logo-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from('logos').upload(path, file, { upsert: true });

    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('logos').getPublicUrl(path);
    setLogoUrl(urlData.publicUrl);
    setUploading(false);
    toast({ title: 'Logo uploaded' });
  };

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase
      .from('quiz_configs')
      .update({
        business_name: businessName,
        full_name: fullName,
        email,
        brand_colour: brandColour,
        logo_url: logoUrl || '',
        font_family: fontFamily,
      } as any)
      .eq('client_id', userId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      setSaving(false);
      return;
    }

    // Update parent state so sidebar reflects changes immediately
    onConfigChange((prev) => prev ? { ...prev, businessName, fullName, email, brandColour, logo: logoUrl, fontFamily } : prev);

    toast({ title: 'Changes saved', description: 'Your branding settings have been updated.' });
    setSaving(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Branding</h1>

      <div className="max-w-[600px] space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Elevate Coaching Co."
          />
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Your Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Sarah Mitchell"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sarah@elevatecoaching.com"
          />
        </div>

        {/* Brand Colour */}
        <div className="space-y-2">
          <Label htmlFor="brandColour">Brand Colour</Label>
          <div className="flex items-center gap-3">
            <input
              id="brandColour"
              type="color"
              value={brandColour}
              onChange={(e) => setBrandColour(e.target.value)}
              className="h-10 w-14 rounded border border-border cursor-pointer p-0.5"
            />
            <Input
              value={brandColour}
              onChange={(e) => setBrandColour(e.target.value)}
              className="max-w-[140px] font-mono text-sm"
              placeholder="#C9A96E"
            />
            <div
              className="h-10 w-10 rounded-md border border-border shrink-0"
              style={{ backgroundColor: brandColour }}
            />
          </div>
        </div>

        {/* Quiz Font */}
        <div className="space-y-2">
          <Label>Quiz Font</Label>
          <div className="grid grid-cols-3 gap-3">
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.family}
                type="button"
                onClick={() => setFontFamily(opt.family)}
                className="rounded-lg border-2 p-4 text-left transition-colors hover:bg-muted/30"
                style={{
                  borderColor: fontFamily === opt.family ? brandColour : 'var(--border)',
                }}
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">{opt.label}</p>
                <p
                  className="leading-snug text-foreground"
                  style={{ fontFamily: `'${opt.family}', ${opt.fallback}`, fontSize: 24 }}
                >
                  What's Really Holding Your Business Back?
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="space-y-2">
          <Label>Logo</Label>
          {logoUrl && (
            <div className="relative inline-block">
              <img
                src={logoUrl}
                alt="Logo preview"
                className="h-20 w-auto rounded-md border border-border object-contain bg-white p-2"
              />
              <button
                type="button"
                onClick={() => setLogoUrl('')}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading…' : 'Upload logo'}
            </Button>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or SVG. Displayed in your quiz.</p>
          </div>
        </div>

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="text-white"
          style={{ backgroundColor: '#C9A96E' }}
        >
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
