import { useParams } from 'react-router-dom';
import { useQuizConfig } from '@/hooks/useQuizConfig';

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const { config, loading, error } = useQuizConfig(slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Quiz Not Found</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full p-8 space-y-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">{config.businessName}</h1>
        <p className="text-muted-foreground">by {config.fullName}</p>
        <p className="text-primary font-semibold">{config.ctaText}</p>
        <div className="space-y-1 pt-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Result Types</h2>
          {Object.keys(config.resultTexts).map((name) => (
            <p key={name} className="text-foreground">{name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
