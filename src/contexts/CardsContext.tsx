import { createContext, useContext, useReducer, type Dispatch } from 'react';
import { cardsReducer, initialCardsState } from '../reducers/cardsReducer';
import type { Card } from '../types';

type CardsContextType = {
  cards: Card[];
};

type CardsAction =
  | { type: 'ADD_CARDS'; payload: { count: number } }
  | { type: 'REMOVE_CARD'; payload: { id: number } };

const CardsContext = createContext<CardsContextType>({ cards: [] });
const CardsDispatchContext = createContext<Dispatch<CardsAction> | null>(null);
export const CardsProvider = ({ children }) => {
  const [cards, dispatch] = useReducer(cardsReducer, initialCardsState);

  return (
    <CardsContext value={{ cards }}>
      <CardsDispatchContext value={dispatch}>{children}</CardsDispatchContext>
    </CardsContext>
  );
};

export const useCards = () => useContext(CardsContext);

export const useCardsDispatch = () => {
  const context = useContext(CardsDispatchContext);
  if (!context) {
    throw new Error('useCardsDispatch must be used within a CardsProvider');
  }
  return context;
};
