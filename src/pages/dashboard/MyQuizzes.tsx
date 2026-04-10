import { useState, useRef } from 'react';
import { Plus, ArrowRight, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QuizRow {
  id: string;
  quiz_name: string;
  slug: string;
}

interface MyQuizzesProps {
  quizzes: QuizRow[];
  onSelectQuiz: (quizId: string) => void;
}

export default function MyQuizzes({ quizzes, onSelectQuiz }: MyQuizzesProps) {
  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'rgba(217,70,239,0.1)' }}
        >
          <Plus className="h-8 w-8" style={{ color: '#D946EF' }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0F0A1E' }}>
          You don't have any quizzes yet
        </h2>
        <p className="text-base mb-8 max-w-md" style={{ color: '#6B5F80' }}>
          Get started with PretaQuiz and create your first lead-generating quiz in minutes.
        </p>
        <Link
          to="/get-started"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>My Quizzes</h1>
      <p className="text-sm mb-8" style={{ color: '#6B5F80' }}>
        Select a quiz to configure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(217,70,239,0.15)',
            }}
          >
            <div>
              <h3 className="text-base font-bold leading-tight" style={{ color: '#0F0A1E' }}>
                {quiz.quiz_name}
              </h3>
              <p className="text-xs mt-1 truncate" style={{ color: '#9A8EAA' }}>
                /{quiz.slug}
              </p>
            </div>
            <button
              onClick={() => onSelectQuiz(quiz.id)}
              className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F020B0', color: '#FFFFFF' }}
            >
              Configure
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}

        {/* Add a quiz card */}
        <a
          href="https://pretaquiz.com/get-started"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl p-5 flex flex-col items-center justify-center gap-3 min-h-[180px] transition-colors hover:border-opacity-40 group"
          style={{
            border: '2px dashed rgba(217,70,239,0.3)',
            backgroundColor: 'transparent',
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(217,70,239,0.08)' }}
          >
            <Plus className="h-5 w-5" style={{ color: '#D946EF' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#D946EF' }}>
            Add a quiz
          </span>
        </a>
      </div>
    </div>
  );
}
