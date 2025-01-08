const SYMBOLS = ["😃", "💵", "💲", "💰"];

export function generateMatrixGame1(): {
  winningNumbers: number[];
  grid: number[][];
} {
  const winningNumbers = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 100)
  );
  const grid = Array.from({ length: 4 }, () =>
    Array.from({ length: 3 }, () => Math.floor(Math.random() * 100))
  );
  return { winningNumbers, grid };
}

export function generateArrayGame2(): string[] {
  return Array.from(
    { length: 4 },
    () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  );
}

export function generateDetails(gameWon: number | null): any {
  const { winningNumbers, grid } = generateMatrixGame1();
  const symbols = generateArrayGame2();
  let logoIncluded = false;
  if (gameWon === 3) logoIncluded = true;
  return { winningNumbers, grid, symbols, logoIncluded };
}
