import { getRandomColor } from './getRandomColor';
import { getRandomCountdown } from './getRandomCountdown';

export const createNewCard = () => {
  return { id: Date.now(), color: getRandomColor(), countdown: getRandomCountdown() };
};
