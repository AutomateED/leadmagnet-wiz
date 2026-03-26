import { useConfig } from '@/hooks/useConfig';
import { calculateResult } from '@/utils/scoring';
import { useQuiz } from '@/hooks/useQuiz';
import StartScreen from '@/components/quiz/StartScreen';
import QuestionScreen from '@/components/quiz/QuestionScreen';
import EmailGate from '@/components/quiz/EmailGate';
import ConfirmationScreen from '@/components/quiz/ConfirmationScreen';
import { fireWebhook } from '@/utils/webhook';
import { sendResultEmail } from '@/utils/email';
import { QUESTIONS } from '@/utils/questions';

export default function Index() {
  const { config } = useConfig();
  const quiz = useQuiz();

  const handleEmailSubmit = async (firstName: string, email: string, lastName: string) => {
    quiz.submitEmail(firstName, email, lastName);

    const resultType = quiz.result!;
    const resultCopy = config.resultTexts[resultType];

    // Fire webhook (silent)
    fireWebhook(config, {
      first_name: firstName,
      last_name: lastName,
      email,
      result_type: resultType,
      result_copy: resultCopy,
      answers: quiz.answers,
      quiz_name: "What's Really Holding Your Business Back?",
      client_name: config.businessName,
      timestamp: new Date().toISOString(),
    });

    // Send email (silent)
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
          questions={config.questions && config.questions.length > 0 ? config.questions : QUESTIONS}
          onAnswer={(qi, letter) => quiz.answerQuestion(qi, letter, (config.questions && config.questions.length > 0 ? config.questions : QUESTIONS).length)}
          onBack={quiz.goBack}
        />
      );
    case 'email':
      return <EmailGate brandColour={config.brandColour} onSubmit={handleEmailSubmit} />;
    case 'confirmation':
    case 'confirmation': {
      const confirmResult = calculateResult(quiz.answers);
      const confirmCopy = config.resultTexts[confirmResult];
      return <ConfirmationScreen config={config} email={quiz.userData.email} resultType={confirmResult} resultCopy={confirmCopy} />;
    }
  }
}
