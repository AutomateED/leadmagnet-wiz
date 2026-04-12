import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { QuizConfig } from '@/hooks/useConfig';
import { DEFAULT_RESULT_TITLES } from '@/hooks/useConfig';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ResultsProps {
  config: QuizConfig;
  onConfigChange: React.Dispatch<React.SetStateAction<QuizConfig | null>>;
  userId: string;
  quizId: string;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function Results({ config, onConfigChange, userId, quizId }: ResultsProps) {
  const { toast } = useToast();

  const titles = config.resultTitles || DEFAULT_RESULT_TITLES;

  const [localTitles, setLocalTitles] = useState<Record<string, string>>({ ...titles });
  const [texts, setTexts] = useState<Record<string, string>>({ ...config.resultTexts });
  const [savingType, setSavingType] = useState<string | null>(null);

  const localTitlesRef = useRef(localTitles);
  const textsRef = useRef(texts);

  localTitlesRef.current = localTitles;
  textsRef.current = texts;

  const handleTitleChange = (letter: string, value: string) => {
    setLocalTitles((prev) => ({ ...prev, [letter]: value }));
  };

  const handleTextChange = (title: string, value: string) => {
    setTexts((prev) => ({ ...prev, [title]: value }));
  };

  const handleSaveOne = async (letter: string) => {
    setSavingType(letter);

    const currentTitles = localTitlesRef.current;
    const currentTexts = textsRef.current;

    const originalTitle = titles[letter as keyof typeof titles];
    const newTitle = currentTitles[letter];
    const updatedTitles = { ...currentTitles };
    const updatedTexts = { ...currentTexts };

    // Build updated texts — if the title changed, re-key the text
    if (newTitle !== originalTitle) {
      const textValue = updatedTexts[originalTitle] || '';
      delete updatedTexts[originalTitle];
      updatedTexts[newTitle] = textValue;
    }

    const { error } = await supabase
      .from('quiz_configs')
      .update({
        result_titles: updatedTitles as any,
        result_texts: updatedTexts as any,
      })
      .eq('id', quizId);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      setTexts(updatedTexts);
      onConfigChange((prev) =>
        prev
          ? {
              ...prev,
              resultTitles: updatedTitles as QuizConfig['resultTitles'],
              resultTexts: updatedTexts,
            }
          : prev
      );
      toast({ title: `Saved: ${newTitle}` });
    }
    setSavingType(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>Results</h1>
      <p className="mb-8" style={{ color: '#6B5F80' }}>Customise the result types and descriptions prospects see</p>

      <div className="max-w-[700px] space-y-8">
        {LETTERS.map((letter) => {
          const title = localTitles[letter] || '';
          const textKey = titles[letter]; // use current saved title as text key
          const currentTextKey = localTitles[letter]; // but if user changed title locally, text is still under old key
          const textValue = texts[currentTextKey] || texts[textKey] || '';

          return (
            <div key={letter} className="space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#9A8EAA' }}>
                Result {letter}
              </Label>

              <div className="space-y-1">
                <Label className="text-sm">Result title</Label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(letter, e.target.value)}
                  placeholder={`e.g. ${DEFAULT_RESULT_TITLES[letter]}`}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Description</Label>
                <Textarea
                  rows={6}
                  value={textValue}
                  onChange={(e) => handleTextChange(localTitles[letter], e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
              <Button
                size="sm"
                onClick={() => handleSaveOne(letter)}
                disabled={savingType !== null}
                style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}
              >
                {savingType === letter ? 'Saving...' : 'Save'}
              </Button>
                <p className="text-xs" style={{ color: '#9A8EAA' }}>{textValue.length} characters</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
