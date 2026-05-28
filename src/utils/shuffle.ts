export function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function sampleItems<T>(items: T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(`Cannot sample ${count} unique items from a pool of ${items.length}.`);
  }

  return shuffleArray(items).slice(0, count);
}
