import { createContext, useContext, useReducer } from 'react';
import { cardsReducer, initialCardsState } from '../reducers/cardsReducer';

const CardsContext = createContext([]);
const CardsDispatchContext = createContext(null);

export const CardsProvider = ({ children }) => {
  const [cards, dispatch] = useReducer(cardsReducer, initialCardsState);

  return (
    <CardsContext value={cards}>
      <CardsDispatchContext value={dispatch}>{children}</CardsDispatchContext>
    </CardsContext>
  );
};

export const useCards = () => useContext(CardsContext);

export const useCardsDispatch = () => useContext(CardsDispatchContext);
