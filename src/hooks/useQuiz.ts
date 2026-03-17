import { useState, useCallback } from 'react';
import { calculateResult, type ResultType } from '@/utils/scoring';

export type QuizScreen = 'start' | 'question' | 'email' | 'confirmation';

export function useQuiz() {
  const [screen, setScreen] = useState<QuizScreen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ResultType | null>(null);
  const [direction, setDirection] = useState(1);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' });

  const startQuiz = useCallback(() => {
    setScreen('question');
    setCurrentQuestion(0);
    setDirection(1);
  }, []);

  const answerQuestion = useCallback((questionIndex: number, letter: string) => {
    setAnswers((prev) => ({ ...prev, [`q${questionIndex + 1}`]: letter }));
    setDirection(1);

    if (questionIndex >= 6) {
      // Last question — go to email gate
      setTimeout(() => {
        const allAnswers = { ...answers, [`q${questionIndex + 1}`]: letter };
        const resultType = calculateResult(allAnswers);
        setResult(resultType);
        setScreen('email');
      }, 400);
    } else {
      setTimeout(() => {
        setCurrentQuestion(questionIndex + 1);
      }, 400);
    }
  }, [answers]);

  const goBack = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const submitEmail = useCallback((firstName: string, email: string, lastName?: string) => {
    setUserData({ firstName, lastName: lastName || '', email });
    setScreen('confirmation');
  }, []);

  const reset = useCallback(() => {
    setScreen('start');
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setUserData({ firstName: '', email: '' });
  }, []);

  return {
    screen,
    currentQuestion,
    answers,
    result,
    direction,
    userData,
    startQuiz,
    answerQuestion,
    goBack,
    submitEmail,
    reset,
  };
}
