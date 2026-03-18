import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig, type QuizConfig, DEFAULT_CONFIG } from '@/hooks/useConfig';
import { useToast } from '@/hooks/use-toast';
import StepDetails from './StepDetails';
import StepBranding from './StepBranding';
import StepResults from './StepResults';
import StepCTA from './StepCTA';
import StepEmail from './StepEmail';
import StepReview from './StepReview';

const STEPS = [
  { label: 'Details', component: StepDetails },
  { label: 'Branding', component: StepBranding },
  { label: 'Results', component: StepResults },
  { label: 'CTA', component: StepCTA },
  { label: 'Email', component: StepEmail },
  { label: 'Review', component: StepReview },
];

export default function SetupWizard() {
  const { config, setConfig } = useConfig();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<QuizConfig>({ ...config });
  const [saved, setSaved] = useState(false);

  const updateDraft = useCallback((partial: Partial<QuizConfig>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = () => step < 5 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const { toast } = useToast();

  const save = () => {
    setConfig(draft);
    setSaved(true);
    toast({ title: 'Quiz saved!', description: 'Your quiz is ready to share.' });
  };

  const StepComponent = STEPS[step].component;

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-xl font-semibold text-foreground mb-4">
            Preta<span className="font-bold">Quiz</span>
            <span className="ml-2 text-sm font-sans font-normal text-muted-foreground">Setup</span>
          </h1>

          {/* Step indicator */}
          <div className="flex gap-1">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setStep(i)}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="h-1 w-full rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: i <= step ? config.brandColour : 'hsl(var(--border))',
                  }}
                />
                <span
                  className={`text-xs transition-colors ${
                    i === step ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepComponent
              draft={draft}
              updateDraft={updateDraft}
              onSave={save}
              saved={saved}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="rounded-full px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            ← Back
          </button>
          {step < 5 ? (
            <button
              onClick={next}
              className="rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lift active:scale-95"
              style={{ backgroundColor: config.brandColour }}
            >
              Continue →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
