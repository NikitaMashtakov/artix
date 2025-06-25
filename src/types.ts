export type Card = {
  id: string;
  color: string;
  countdown: number;
  createdAt: number;
};

export type CardsAction =
  | { type: 'ADD_CARDS'; payload: { count: number } }
  | { type: 'DELETE_CARD'; payload: { id: string } }
  | { type: 'UPDATE_COUNTDOWN'; payload: { id: string } };
