import { ExternalLink } from 'lucide-react';

interface QuizPreviewProps {
  slug: string;
}

export default function QuizPreview({ slug }: QuizPreviewProps) {
  const quizUrl = `/quiz/${slug}`;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Preview Your Quiz</h1>
      <p className="text-muted-foreground mb-6">This is exactly what your prospects will see.</p>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-[500px] rounded-2xl border border-border shadow-lg overflow-hidden bg-background">
          <iframe src={quizUrl} className="w-full border-0" style={{ height: 700 }} title="Quiz preview" />
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
