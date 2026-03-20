import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizConfig } from '@/hooks/useQuizConfig';
import StartScreen from '@/components/quiz/StartScreen';
import QuestionScreen from '@/components/quiz/QuestionScreen';
import EmailGate from '@/components/quiz/EmailGate';
import ConfirmationScreen from '@/components/quiz/ConfirmationScreen';
import { fireWebhook } from '@/utils/webhook';
import { sendResultEmail } from '@/utils/email';

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const { config, loading, error } = useQuizConfig(slug);
  const quiz = useQuiz();

  // Dynamically load selected Google Font
  useEffect(() => {
    if (!config?.fontFamily) return;
    const family = config.fontFamily.replace(/ /g, '+');
    const id = `quiz-font-${family}`;
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [config?.fontFamily]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Quiz not found</h1>
          <p className="text-muted-foreground">{error || "We couldn't find a quiz at this URL."}</p>
        </div>
      </div>
    );
  }

  const handleEmailSubmit = async (firstName: string, email: string, lastName: string) => {
    quiz.submitEmail(firstName, email, lastName);
    const resultType = quiz.result!;
    const resultCopy = config.resultTexts[resultType];

    fireWebhook(config, {
      first_name: firstName,
      last_name: lastName,
      email,
      result_type: resultType,
      answers: quiz.answers,
      quiz_name: "What's Really Holding Your Business Back?",
      client_name: config.businessName,
      timestamp: new Date().toISOString(),
    });

    sendResultEmail(config, {
      to_email: email,
      to_name: firstName,
      result_type: resultType,
      result_copy: resultCopy,
      cta_text: config.ctaText,
      cta_url: config.ctaUrl,
      business_name: config.businessName,
      coach_tagline: config.ctaTagline,
    });
  };

  switch (quiz.screen) {
    case 'start':
      return <StartScreen config={config} onStart={quiz.startQuiz} />;
    case 'question':
      return (
        <QuestionScreen
          questionIndex={quiz.currentQuestion}
          answers={quiz.answers}
          brandColour={config.brandColour}
          direction={quiz.direction}
          onAnswer={quiz.answerQuestion}
          onBack={quiz.goBack}
        />
      );
    case 'email':
      return <EmailGate brandColour={config.brandColour} onSubmit={handleEmailSubmit} />;
    case 'confirmation':
      return <ConfirmationScreen config={config} email={quiz.userData.email} />;
  }
}
