const KEYWORDS = [
  'important',
  'key',
  'main',
  'must',
  'should',
  'best',
  'always',
  'never',
  'principal',
  'esencial',
  'debe',
  'mejor',
  'garantiza',
  'permiten',
];

interface ScoredSentence {
  sentence: string;
  index: number;
  score: number;
}

export function summarize(body: string): string {
  const sentences = body
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 2) {
    return sentences.join(' ');
  }

  const scored: ScoredSentence[] = sentences.map((sentence, index) => {
    const lower = sentence.toLowerCase();
    const keywordHits = KEYWORDS.reduce(
      (acc, kw) => acc + (lower.includes(kw) ? 1 : 0),
      0,
    );
    const lengthScore = Math.min(sentence.length / 80, 1);
    const positionBonus = index === 0 ? 0.4 : 0;
    return {
      sentence,
      index,
      score: lengthScore + keywordHits * 0.6 + positionBonus,
    };
  });

  const topTwo = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .sort((a, b) => a.index - b.index);

  return topTwo.map((s) => s.sentence).join(' ');
}
