import { ExternalLink } from 'lucide-react';
import StartScreen from '@/components/quiz/StartScreen';
import type { QuizConfig } from '@/hooks/useConfig';

interface QuizPreviewProps {
  slug: string;
  config?: QuizConfig | null;
}

export default function QuizPreview({ slug, config }: QuizPreviewProps) {
  const quizUrl = `${window.location.origin}/quiz/${slug}`;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Preview Your Quiz</h1>
      <p className="text-muted-foreground mb-6">This is exactly what your prospects will see.</p>

      <div className="flex flex-col items-center">
        <div
          className="w-full max-w-[500px] rounded-2xl border border-border shadow-lg overflow-hidden bg-background"
          style={{ height: 900, overflowY: 'auto', pointerEvents: 'none', opacity: 0.95 }}
        >
          {config ? (
            <StartScreen config={config} onStart={() => {}} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Loading preview…</div>
          )}
        </div>

        <a
          href={quizUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" /> Open in new tab
        </a>
      </div>
    </div>
  );
}
