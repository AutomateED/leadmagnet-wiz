export type ResultType = string;

const ANSWER_MAP: Record<string, string> = {
  A: 'The Invisible Expert',
  B: 'The Overwhelmed Operator',
  C: 'The Confident Starter',
  D: 'The Plateau Breaker',
};

const TIEBREAK_ORDER: string[] = [
  'The Overwhelmed Operator',
  'The Invisible Expert',
  'The Plateau Breaker',
  'The Confident Starter',
];

export function calculateResult(answers: Record<string, string>, resultTitles?: Record<string, string>): string {
  const map = resultTitles ?? ANSWER_MAP;
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

  Object.values(answers).forEach((answer) => {
    if (counts[answer] !== undefined) {
      counts[answer]++;
    }
  });

  const maxCount = Math.max(...Object.values(counts));
  const tied = Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([letter]) => map[letter]);

  // Use custom tiebreak based on provided titles, falling back to default order
  const tiebreak = resultTitles
    ? [map.B, map.A, map.D, map.C].filter(Boolean)
    : TIEBREAK_ORDER;

  for (const result of tiebreak) {
    if (tied.includes(result)) return result;
  }

  return map.A ?? 'The Invisible Expert';
}
