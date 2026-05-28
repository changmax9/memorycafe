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
  orderLength: number;
  availableItemIds: string[];
  distractorItemIds: string[];
  studySeconds: number;
  chunkingEnabled: boolean;
  note?: string;
};

export type RoundLevel = Level & {
  order: string[];
  choices: string[];
};

export type PlayerAnswer = {
  levelId: number;
  selectedItemIds: string[];
  correctByPosition: number;
  missedItems: string[];
  incorrectItems: string[];
};

export type GamePhase = 'start' | 'study' | 'build' | 'feedback' | 'end';
