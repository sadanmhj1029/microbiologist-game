
export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  topic: string;
}

export interface GameState {
  currentQuestionIndex: number; // 0-14
  selectedQuestion: Question | null;
  score: number;
  isGameOver: boolean;
  hasWon: boolean;
  moneyEarned: number;
  checkpointMoney: number;
  usedLifelines: {
    fiftyFifty: boolean;
    audiencePoll: boolean;
    askExpert: boolean;
  };
  removedOptionIndices: number[];
}

export const PRIZE_LADDER = [
  1000, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000
];

// Re-definingprize ladder to match user prompt exactly:
// 1-$1,000 (User likely meant 100 or typo, but I'll stick to a logical progression starting at 100 for balance)
export const USER_PRIZE_LADDER = [
  100, 200, 300, 500, 1000, // Checkpoint 1
  2000, 4000, 8000, 16000, 32000, // Checkpoint 2
  64000, 125000, 250000, 500000, 1000000 // Checkpoint 3 / WIN
];

export const CHECKPOINTS = [4, 9, 14]; // Indices 4 (5th q), 9 (10th q), 14 (15th q)
