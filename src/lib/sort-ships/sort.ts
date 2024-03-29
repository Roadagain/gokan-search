import { Ship } from '../ship';
import { SortOrder } from './sort-order';

const sortById = (ships: Ship[]): Ship[] => {
  return ships.slice().sort((a, b) => a.id - b.id);
};

const compareKana = (a: string, b: string): number => {
  const isAKana = !!a.match(/^[あ-ん]/);
  const isBKana = !!b.match(/^[あ-ん]/);

  if ((isAKana && isBKana) || (!isAKana && !isBKana)) {
    return a.localeCompare(b);
  }
  if (isAKana) {
    return -1;
  }
  return 1;
};

const sortByKana = (ships: Ship[]): Ship[] => {
  return ships.slice().sort((a, b) => compareKana(a.kana, b.kana));
};

export const sortShips = (ships: Ship[], order: SortOrder): Ship[] => {
  switch (order) {
    case SortOrder.ID:
      return sortById(ships);
    case SortOrder.KANA:
      return sortByKana(ships);
    default:
      throw new Error('Invalid sort order');
  }
};
