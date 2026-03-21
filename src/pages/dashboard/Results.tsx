import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ResultsProps {
  config: QuizConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<QuizConfig | null>>;
  userId: string;
}

const RESULT_TYPES = [
  'The Invisible Expert',
  'The Overwhelmed Operator',
  'The Confident Starter',
  'The Plateau Breaker',
] as const;

export default function Results({ config, onConfigChange, userId }: ResultsProps) {
  const { toast } = useToast();
  const [texts, setTexts] = useState({ ...config.resultTexts });
  const [savingType, setSavingType] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setTexts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveOne = async (type: string) => {
    setSavingType(type);
    const updated = { ...texts };
    const { error } = await supabase
      .from('quiz_configs')
      .update({ result_texts: updated as any })
      .eq('client_id', userId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      onConfigChange((prev) => prev ? { ...prev, resultTexts: updated as QuizConfig['resultTexts'] } : prev);
      toast({ title: `Saved: ${type}` });
    }
    setSavingType(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>Results</h1>
      <p className="mb-8" style={{ color: '#6B5F80' }}>Customise the text prospects see for each result type</p>

      <div className="max-w-[700px] space-y-8">
        {RESULT_TYPES.map((type) => (
          <div key={type} className="space-y-2">
            <Label>{type}</Label>
            <Textarea
              rows={6}
              value={(texts as any)[type] || ''}
              onChange={(e) => handleChange(type, e.target.value)}
            />
            <div className="flex items-center justify-between">
              <Button size="sm" onClick={() => handleSaveOne(type)} disabled={savingType === type} style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}>
                {savingType === type ? 'Saving...' : 'Save'}
              </Button>
              <p className="text-xs" style={{ color: '#9A8EAA' }}>{((texts as any)[type] || '').length} characters</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}