import { createContext, useContext, useReducer, type Dispatch, type FC } from 'react';
import { cardsReducer, initialCardsState } from '../reducers/cardsReducer';
import type { Card, CardsAction } from '../types/types';

type CardsContextType = {
  cards: Card[];
};

type CardsProviderType = {
  children: React.ReactNode;
};

const CardsContext = createContext<CardsContextType>({ cards: [] });
const CardsDispatchContext = createContext<Dispatch<CardsAction> | null>(null);

export const CardsProvider: FC<CardsProviderType> = ({ children }) => {
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
