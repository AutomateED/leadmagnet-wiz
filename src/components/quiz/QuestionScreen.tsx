import { AnimatePresence, motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import AnswerCard from './AnswerCard';
import { ChevronLeft } from 'lucide-react';

interface QuestionScreenProps {
  questionIndex: number;
  answers: Record<string, string>;
  brandColour: string;
  direction: number;
  questions: { id: number; text: string; options: { letter: string; text: string }[] }[];
  onAnswer: (questionIndex: number, letter: string) => void;
  onBack: () => void;
}

export default function QuestionScreen({
  questionIndex,
  answers,
  brandColour,
  direction,
  questions,
  onAnswer,
  onBack,
}: QuestionScreenProps) {
  const question = questions[questionIndex];
  const selectedAnswer = answers[`q${questionIndex + 1}`];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="flex min-h-[100dvh] flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <ProgressBar current={questionIndex} total={questions.length} brandColour={brandColour} />

      {/* Back button */}
      {questionIndex > 0 && (
        <button
          onClick={onBack}
          className="fixed top-6 left-4 z-40 flex items-center gap-1 text-sm transition-colors"
          style={{ color: '#6B5F80' }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      <div className="flex flex-1 items-center justify-center px-4 py-16 md:px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={questionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            {/* Question number */}
            <p className="font-mono text-sm tracking-wider mb-4" style={{ color: '#9A8EAA' }}>
              <span className="tabular-nums">{String(questionIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span className="tabular-nums">07</span>
            </p>

            {/* Question text */}
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-10" style={{ color: '#0F0A1E' }}>
              {question.text}
            </h2>

            {/* Answer cards */}
            <div className="flex flex-col gap-3">
              {question.options.map((opt, i) => (
                <AnswerCard
                  key={opt.letter}
                  letter={opt.letter}
                  text={opt.text}
                  selected={selectedAnswer === opt.letter}
                  brandColour={brandColour}
                  index={i}
                  onSelect={() => onAnswer(questionIndex, opt.letter)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}