import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

const PROMPT_1 = `I'm creating a lead-generation quiz for my coaching business. Please write 7 quiz questions, each with exactly 4 answer options labelled A, B, C, and D.

Important: each letter should consistently represent the same type of person across all 7 questions. So all A answers describe one type, all B answers describe another, and so on.

About my business:

- My niche: [e.g. mindset coaching for female entrepreneurs]

- My ideal client: [e.g. women in their 30s–40s who are stuck in corporate and want to go out on their own]

- The main problem I solve: [e.g. self-doubt and fear of starting a business]

Format each question exactly like this:

Q1: [question text]

A: [answer]

B: [answer]

C: [answer]

D: [answer]

Write all 7 questions in this format. Keep the language warm, conversational, and relatable — not clinical or corporate.`;

const PROMPT_2 = `I need 4 result types for my coaching quiz — one for each letter (A, B, C, D), based on the answer patterns from my questions.

About my business:

- My niche: [e.g. mindset coaching for female entrepreneurs]

- My ideal client: [e.g. women in their 30s–40s who are stuck in corporate and want to go out on their own]

- My main offer: [e.g. 3-month 1:1 coaching programme called "The Leap"]

- The transformation I deliver: [e.g. from stuck and doubting herself to confident and running her own business]

For each result type, write:

1. A memorable name (e.g. "The Invisible Expert", "The Overwhelmed Operator") — something that feels like an identity, not a diagnosis

2. A description of 3–4 sentences that: validates how they're feeling, names the real issue holding them back, points toward the solution without being salesy, and ends with a line that makes them curious about working with you

Format exactly like this:

Result A — [Name]:

[Description]

Result B — [Name]:

[Description]

Result C — [Name]:

[Description]

Result D — [Name]:

[Description]`;

function CopyablePrompt({ text, id }: { text: string; id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl p-5 mt-4"
      style={{ backgroundColor: '#F8F7FF', border: '1px solid rgba(217,70,239,0.12)' }}
    >
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
        style={{
          backgroundColor: copied ? 'rgba(217,70,239,0.12)' : 'rgba(217,70,239,0.08)',
          color: '#D946EF',
        }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied!
          </>
        ) : (
          <>
            <Clipboard className="h-3.5 w-3.5" />
            Copy prompt
          </>
        )}
      </button>
      <pre
        className="whitespace-pre-wrap leading-relaxed pr-28"
        style={{ fontSize: '13px', color: '#2D1A4A' }}
      >
        {text}
      </pre>
    </div>
  );
}

const TIPS = [
  {
    title: 'Fill in every placeholder',
    desc: 'The prompts have [brackets] for your details. The more specific you are, the better the output.',
  },
  {
    title: 'Run both prompts together',
    desc: 'Paste Step 1 first, review the questions, then run Step 2. This keeps the result types consistent with your answers.',
  },
  {
    title: 'Edit freely',
    desc: "AI gives you a starting point. Change any wording that doesn't sound like you — your voice matters.",
  },
  {
    title: 'Paste straight in',
    desc: 'Copy the output from your AI tool and paste it directly into the Questions and Results pages in your dashboard.',
  },
];

export default function AiGuide() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: '#0F0A1E' }}>
        Write your quiz with AI
      </h1>
      <p className="text-sm mb-10" style={{ color: '#6B5F80' }}>
        Not sure what to write? Use these ready-made prompts in Claude, ChatGPT, or any AI tool to
        generate your full quiz content in minutes. Then copy the output straight into your PretaQuiz
        dashboard.
      </p>

      {/* STEP 1 */}
      <section className="mb-10">
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: '#D946EF' }}
        >
          Step 1
        </span>
        <h2 className="text-lg font-bold mt-1 mb-1" style={{ color: '#0F0A1E' }}>
          Questions and answers
        </h2>
        <p className="text-sm" style={{ color: '#6B5F80' }}>
          This prompt generates 7 questions, each with 4 answer options (A, B, C, D). Each letter
          consistently represents the same type of person throughout — so your results are accurate.
        </p>
        <CopyablePrompt text={PROMPT_1} id="prompt1" />
      </section>

      {/* STEP 2 */}
      <section className="mb-10">
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: '#D946EF' }}
        >
          Step 2
        </span>
        <h2 className="text-lg font-bold mt-1 mb-1" style={{ color: '#0F0A1E' }}>
          Result names and descriptions
        </h2>
        <p className="text-sm" style={{ color: '#6B5F80' }}>
          This prompt generates 4 result types — one for each letter. Each result gets a memorable
          name and a personalised description your prospects will read after completing the quiz.
        </p>
        <CopyablePrompt text={PROMPT_2} id="prompt2" />
      </section>

      {/* TIPS */}
      <section>
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: '#D946EF' }}
        >
          Tips
        </span>
        <h2 className="text-lg font-bold mt-1 mb-4" style={{ color: '#0F0A1E' }}>
          Get better output
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIPS.map((tip) => (
            <div
              key={tip.title}
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(217,70,239,0.15)',
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: '#0F0A1E' }}>
                {tip.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#6B5F80' }}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
