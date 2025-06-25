import type { Card, CardsAction } from '../types';
import { generateCards } from '../utils/generateCards';
import { getRandomCountdown } from '../utils/getRandomCountdown';

export const initialCardsState: Card[] = [];

export const cardsReducer = (state: Card[], action: CardsAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'DELETE_CARD':
      return state.filter(({ id }) => id !== payload.id);
    case 'ADD_CARDS': {
      const newCards = generateCards(payload.count);
      return [...state, ...newCards];
    }
    case 'UPDATE_COUNTDOWN': {
      return state.map((card) =>
        card.id === payload.id ? { ...card, countdown: getRandomCountdown() } : card,
      );
    }
    default:
      return state;
  }
};
