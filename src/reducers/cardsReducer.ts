import type { Card } from '../types';
import { generateCards } from '../utils/generateCards';

export const initialCardsState: Card[] = [];

export const cardsReducer = (state: Card[], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'DELETE_CARD':
      return state.filter(({ id }) => id !== payload.id);
    case 'ADD_CARDS': {
      const newCards = generateCards(payload.count);
      return { ...state, ...newCards };
    }
    default:
      return state;
  }
};
