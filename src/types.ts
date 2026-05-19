export type Category = 'Drinks' | 'Pastries' | 'Fruit / Snacks';

export type Item = {
  id: string;
  name: string;
  emoji: string;
  category: Category;
};

export type Level = {
  id: number;
  title: string;
  order: string[];
  choices: string[];
  studySeconds: number;
  chunkingEnabled: boolean;
  note?: string;
};

export type PlayerAnswer = {
  levelId: number;
  selectedItemIds: string[];
  correctByPosition: number;
  missedItems: string[];
  incorrectItems: string[];
};

export type GamePhase = 'start' | 'study' | 'build' | 'feedback' | 'end';
