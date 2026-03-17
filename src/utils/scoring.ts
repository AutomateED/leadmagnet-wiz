export type ResultType = 'The Invisible Expert' | 'The Overwhelmed Operator' | 'The Confident Starter' | 'The Plateau Breaker';

const ANSWER_MAP: Record<string, ResultType> = {
  A: 'The Invisible Expert',
  B: 'The Overwhelmed Operator',
  C: 'The Confident Starter',
  D: 'The Plateau Breaker',
};

const TIEBREAK_ORDER: ResultType[] = [
  'The Overwhelmed Operator',
  'The Invisible Expert',
  'The Plateau Breaker',
  'The Confident Starter',
];

export function calculateResult(answers: Record<string, string>): ResultType {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

  Object.values(answers).forEach((answer) => {
    if (counts[answer] !== undefined) {
      counts[answer]++;
    }
  });

  const maxCount = Math.max(...Object.values(counts));
  const tied = Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([letter]) => ANSWER_MAP[letter]);

  for (const result of TIEBREAK_ORDER) {
    if (tied.includes(result)) return result;
  }

  return 'The Invisible Expert';
}
