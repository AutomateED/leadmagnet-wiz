import { useRef } from 'react';
import type { QuizConfig } from '@/hooks/useConfig';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

export default function StepBranding({ draft, updateDraft }: StepProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateDraft({ logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">Make it yours</h2>
      <p className="mt-2 text-muted-foreground">Upload your logo and choose your brand colour.</p>

      <div className="mt-8 flex flex-col gap-8">
        {/* Logo upload */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Logo</span>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-card transition-colors hover:border-primary"
          >
            {draft.logo ? (
              <img src={draft.logo} alt="Logo preview" className="h-16 w-auto object-contain" />
            ) : (
              <span className="text-sm text-muted-foreground">Click to upload logo</span>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>

        {/* Brand colour */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Brand colour</span>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={draft.brandColour}
              onChange={(e) => updateDraft({ brandColour: e.target.value })}
              className="h-12 w-12 cursor-pointer rounded-lg border border-border"
            />
            <input
              type="text"
              value={draft.brandColour}
              onChange={(e) => updateDraft({ brandColour: e.target.value })}
              className="rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none focus:border-primary"
              placeholder="#C9A96E"
            />
          </div>
        </label>

        {/* Live preview */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">Preview</p>
          <div className="flex flex-col items-center gap-3">
            {draft.logo && (
              <img src={draft.logo} alt="Preview" className="h-8 w-auto object-contain" />
            )}
            <div
              className="rounded-full px-8 py-3 text-sm font-semibold"
              style={{ backgroundColor: draft.brandColour, color: '#FFFFFF' }}
            >
              Find Out Now →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
