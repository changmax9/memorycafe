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
    orderLength: 3,
    availableItemIds: ['coffee', 'croissant', 'apple', 'tea', 'muffin'],
    distractorItemIds: ['tea', 'muffin'],
    studySeconds: 7,
    chunkingEnabled: false
  },
  {
    id: 2,
    title: 'First Rush',
    orderLength: 4,
    availableItemIds: ['coffee', 'tea', 'latte', 'muffin', 'donut', 'banana'],
    distractorItemIds: ['latte', 'donut'],
    studySeconds: 7,
    chunkingEnabled: false
  },
  {
    id: 3,
    title: 'Busy Counter',
    orderLength: 5,
    availableItemIds: ['coffee', 'latte', 'tea', 'bagel', 'donut', 'croissant', 'berries', 'apple'],
    distractorItemIds: ['coffee', 'croissant', 'apple'],
    studySeconds: 6,
    chunkingEnabled: false,
    note: 'Orders are getting longer. Notice how easy it is to lose the sequence.'
  },
  {
    id: 4,
    title: 'Lunch Line',
    orderLength: 6,
    availableItemIds: ['coffee', 'smoothie', 'tea', 'cake', 'muffin', 'bagel', 'pretzel', 'banana', 'cookie'],
    distractorItemIds: ['tea', 'bagel', 'cookie'],
    studySeconds: 5,
    chunkingEnabled: false
  },
  {
    id: 5,
    title: 'Strategy Shift',
    orderLength: 6,
    availableItemIds: ['coffee', 'latte', 'tea', 'iced-tea', 'croissant', 'bagel', 'cookie', 'apple', 'berries'],
    distractorItemIds: ['coffee', 'iced-tea', 'berries'],
    studySeconds: 5,
    chunkingEnabled: true,
    note: 'Chunking strategy unlocked: group items into meaningful categories.'
  },
  {
    id: 6,
    title: 'Look-Alike Drinks',
    orderLength: 6,
    availableItemIds: ['latte', 'iced-latte', 'tea', 'iced-tea', 'donut', 'cake', 'croissant', 'berries', 'banana', 'cookie'],
    distractorItemIds: ['tea', 'croissant', 'banana', 'cookie'],
    studySeconds: 4,
    chunkingEnabled: true
  },
  {
    id: 7,
    title: 'Closing Rush',
    orderLength: 7,
    availableItemIds: ['coffee', 'latte', 'iced-latte', 'tea', 'iced-tea', 'bagel', 'muffin', 'donut', 'banana', 'apple', 'pretzel'],
    distractorItemIds: ['iced-latte', 'tea', 'donut', 'pretzel'],
    studySeconds: 4,
    chunkingEnabled: true
  },
  {
    id: 8,
    title: 'Memory Café Finale',
    orderLength: 8,
    availableItemIds: ['coffee', 'latte', 'iced-latte', 'tea', 'iced-tea', 'smoothie', 'croissant', 'muffin', 'cake', 'berries', 'pretzel', 'cookie'],
    distractorItemIds: ['coffee', 'latte', 'smoothie', 'muffin'],
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
