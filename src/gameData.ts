import type { Item, Level } from './types';

export const items: Item[] = [
  { id: 'coffee', name: 'Coffee', emoji: '☕', category: 'Drinks' },
  { id: 'latte', name: 'Latte', emoji: '🥛', category: 'Drinks' },
  { id: 'iced-latte', name: 'Iced Latte', emoji: '🧊', category: 'Drinks' },
  { id: 'tea', name: 'Tea', emoji: '🍵', category: 'Drinks' },
  { id: 'iced-tea', name: 'Iced Tea', emoji: '🥤', category: 'Drinks' },
  { id: 'smoothie', name: 'Smoothie', emoji: '🥤', category: 'Drinks' },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', category: 'Pastries' },
  { id: 'muffin', name: 'Muffin', emoji: '🧁', category: 'Pastries' },
  { id: 'donut', name: 'Donut', emoji: '🍩', category: 'Pastries' },
  { id: 'bagel', name: 'Bagel', emoji: '🥯', category: 'Pastries' },
  { id: 'cake', name: 'Cake Slice', emoji: '🍰', category: 'Pastries' },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'Fruit / Snacks' },
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'Fruit / Snacks' },
  { id: 'berries', name: 'Berries', emoji: '🫐', category: 'Fruit / Snacks' },
  { id: 'pretzel', name: 'Pretzel', emoji: '🥨', category: 'Fruit / Snacks' },
  { id: 'cookie', name: 'Cookie', emoji: '🍪', category: 'Fruit / Snacks' }
];

export const levels: Level[] = [
  {
    id: 1,
    title: 'Morning Warm-Up',
    order: ['coffee', 'croissant', 'apple'],
    choices: ['coffee', 'tea', 'croissant', 'muffin', 'apple'],
    studySeconds: 7,
    chunkingEnabled: false
  },
  {
    id: 2,
    title: 'First Rush',
    order: ['tea', 'muffin', 'banana', 'coffee'],
    choices: ['coffee', 'tea', 'latte', 'muffin', 'donut', 'banana'],
    studySeconds: 7,
    chunkingEnabled: false
  },
  {
    id: 3,
    title: 'Busy Counter',
    order: ['latte', 'bagel', 'berries', 'donut', 'tea'],
    choices: ['coffee', 'latte', 'tea', 'bagel', 'donut', 'croissant', 'berries', 'apple'],
    studySeconds: 6,
    chunkingEnabled: false,
    note: 'Orders are getting longer. Notice how easy it is to lose the sequence.'
  },
  {
    id: 4,
    title: 'Lunch Line',
    order: ['smoothie', 'cake', 'pretzel', 'coffee', 'banana', 'muffin'],
    choices: ['coffee', 'smoothie', 'tea', 'cake', 'muffin', 'bagel', 'pretzel', 'banana', 'cookie'],
    studySeconds: 5,
    chunkingEnabled: false
  },
  {
    id: 5,
    title: 'Strategy Shift',
    order: ['latte', 'croissant', 'apple', 'tea', 'cookie', 'bagel'],
    choices: ['coffee', 'latte', 'tea', 'iced-tea', 'croissant', 'bagel', 'cookie', 'apple', 'berries'],
    studySeconds: 5,
    chunkingEnabled: true,
    note: 'Chunking strategy unlocked: group items into meaningful categories.'
  },
  {
    id: 6,
    title: 'Look-Alike Drinks',
    order: ['iced-latte', 'donut', 'berries', 'latte', 'cake', 'iced-tea'],
    choices: ['latte', 'iced-latte', 'tea', 'iced-tea', 'donut', 'cake', 'croissant', 'berries', 'banana', 'cookie'],
    studySeconds: 4,
    chunkingEnabled: true
  },
  {
    id: 7,
    title: 'Closing Rush',
    order: ['coffee', 'bagel', 'banana', 'iced-tea', 'muffin', 'apple', 'latte'],
    choices: ['coffee', 'latte', 'iced-latte', 'tea', 'iced-tea', 'bagel', 'muffin', 'donut', 'banana', 'apple', 'pretzel'],
    studySeconds: 4,
    chunkingEnabled: true
  },
  {
    id: 8,
    title: 'Memory Café Finale',
    order: ['iced-latte', 'croissant', 'berries', 'tea', 'cake', 'pretzel', 'iced-tea', 'cookie'],
    choices: ['coffee', 'latte', 'iced-latte', 'tea', 'iced-tea', 'smoothie', 'croissant', 'muffin', 'cake', 'berries', 'pretzel', 'cookie'],
    studySeconds: 4,
    chunkingEnabled: true
  }
];

export const getItemById = (id: string): Item => {
  const item = items.find((candidate) => candidate.id === id);

  if (!item) {
    throw new Error(`Unknown item id: ${id}`);
  }

  return item;
};
