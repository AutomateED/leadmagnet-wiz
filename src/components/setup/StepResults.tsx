import type { QuizConfig } from '@/hooks/useConfig';
import type { ResultType } from '@/utils/scoring';

interface StepProps {
  draft: QuizConfig;
  updateDraft: (partial: Partial<QuizConfig>) => void;
  onSave?: () => void;
  saved?: boolean;
}

const RESULT_TYPES: ResultType[] = [
  'The Invisible Expert',
  'The Overwhelmed Operator',
  'The Confident Starter',
  'The Plateau Breaker',
];

export default function StepResults({ draft, updateDraft }: StepProps) {
  const updateResultText = (type: ResultType, text: string) => {
    updateDraft({
      resultTexts: { ...draft.resultTexts, [type]: text },
    });
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-foreground">Your 4 result profiles</h2>
      <p className="mt-2 text-muted-foreground">
        Each quiz taker gets one of these results. Write 75–100 words for each.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {RESULT_TYPES.map((type) => (
          <label key={type} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">{type}</span>
            <textarea
              value={draft.resultTexts[type]}
              onChange={(e) => updateResultText(type, e.target.value)}
              rows={4}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary resize-y leading-relaxed"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
