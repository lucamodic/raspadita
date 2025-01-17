const SYMBOLS = ["😃", "💵", "💲", "💰"] as const;

type Symbol = (typeof SYMBOLS)[number];
type Prize = number | null;
type GameWon = number | null;

function generateUniqueNumber(existingNumbers: Set<number>): number {
  let newNumber: number;
  do {
    newNumber = Math.floor(Math.random() * 100);
  } while (existingNumbers.has(newNumber));
  existingNumbers.add(newNumber);
  return newNumber;
}

function generateUniqueNumberArray(
  length: number,
  existingNumbers: Set<number>
): number[] {
  return Array.from({ length }, () => generateUniqueNumber(existingNumbers));
}

function getRequiredMatches(prize: Prize): number {
  if (prize === 4000) return 1;
  if (prize === 5500) return 2;
  if (prize === 10000) return 3;
  if (prize === 20000) return 4;
  return 0;
}

function placeWinningNumbersInGrid(
  grid: number[][],
  winningNumbers: number[],
  requiredMatches: number
): void {
  const shuffledWinningNumbers = [...winningNumbers].sort(
    () => Math.random() - 0.5
  );
  for (let i = 0; i < requiredMatches; i++) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 3);
    grid[row][col] = shuffledWinningNumbers[i];
  }
}

export function generateMatrixGame1(prize: Prize): {
  winningNumbers: number[];
  grid: number[][];
} {
  const allNumbers = new Set<number>();
  const winningNumbers = generateUniqueNumberArray(4, allNumbers);
  const grid = Array.from({ length: 4 }, () =>
    generateUniqueNumberArray(3, allNumbers)
  );

  const requiredMatches = getRequiredMatches(prize);
  if (requiredMatches > 0) {
    placeWinningNumbersInGrid(grid, winningNumbers, requiredMatches);
  }

  return { winningNumbers, grid };
}

function generateSpecificSymbolArray(prize: Prize): Symbol[] {
  if (prize === 250000) return Array(4).fill("💵");
  if (prize === 1000000) return Array(4).fill("💲");
  if (prize === 2000000) return Array(4).fill("💰");
  if (prize === 100000) return Array(4).fill("😃");
  return [];
}

function generateRandomSymbolArray(): Symbol[] {
  let symbolsArray: Symbol[] = [];

  while (symbolsArray.length < 4) {
    const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const count = symbolsArray.filter(
      (symbol) => symbol === randomSymbol
    ).length;

    if (count < 2) {
      symbolsArray.push(randomSymbol);
    }
  }

  return symbolsArray;
}

export function generateArrayGame2(prize: Prize): Symbol[] {
  const specificArray = generateSpecificSymbolArray(prize);

  if (prize === 42000) {
    let symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    let randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    while (symbol === randomSymbol) {
      randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }

    return [symbol, symbol, symbol, randomSymbol];
  }

  if (specificArray.length > 0) return specificArray;

  return generateRandomSymbolArray();
}

function generateNonWinningNumbers(
  winningNumbers: number[],
  count: number
): number[] {
  const allNumbers = new Set<number>(winningNumbers);
  const result: number[] = [];

  while (result.length < count) {
    const newNumber = Math.floor(Math.random() * 100);
    if (!allNumbers.has(newNumber)) {
      result.push(newNumber);
      allNumbers.add(newNumber);
    }
  }

  return result;
}

export function generateDetails(
  gameWon: GameWon,
  prize: Prize
): {
  winningNumbers: number[];
  grid: number[][];
  symbols: Symbol[];
  logoIncluded: boolean;
} {
  let winningNumbers: number[] = [];
  let grid: number[][] = [];
  let symbols: Symbol[] = [];
  let logoIncluded = false;

  const matrix = generateMatrixGame1(prize);
  winningNumbers = matrix.winningNumbers;

  switch (gameWon) {
    case 1:
      grid = matrix.grid;
      symbols = generateArrayGame2(null);
      break;
    case 2:
      symbols = generateArrayGame2(prize);
      grid = Array.from({ length: 4 }, () =>
        generateNonWinningNumbers(winningNumbers, 3)
      );
      break;
    case 3:
      logoIncluded = true;
      symbols = generateArrayGame2(null);
      grid = Array.from({ length: 4 }, () =>
        generateNonWinningNumbers(winningNumbers, 3)
      );
      break;
    default:
      grid = matrix.grid;
      symbols = generateArrayGame2(null);
  }

  return { winningNumbers, grid, symbols, logoIncluded };
}
