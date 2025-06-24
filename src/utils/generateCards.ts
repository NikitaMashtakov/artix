import type { Card } from '../types';
import { createNewCard } from './createNewCard';

export const generateCards = (count: number) => {
  const newCardsArray: Card[] = [];
  for (let i = 0; i < count; i++) {
    newCardsArray.push(createNewCard());
  }
  return newCardsArray;
};
