import { getRandomColor } from './getRandomColor';
import { getRandomCountdown } from './getRandomCountdown';

export const createNewCard = () => {
  return {
    id: Math.random().toFixed(50),
    color: getRandomColor(),
    countdown: getRandomCountdown(),
    createdAt: Date.now(),
  };
};
