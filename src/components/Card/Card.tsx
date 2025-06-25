import { useEffect, useState, type FC } from 'react';
import styles from './Card.module.css';
import { useCardsDispatch } from '../../contexts/CardsContext';

type Props = {
  id: string;
  color: string;
  countdown: number;
};

const Card: FC<Props> = ({ id, color, countdown }) => {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const [isVisible, setIsVisible] = useState(true);

  const dispatch = useCardsDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 200) {
          clearInterval(interval);
          setIsVisible(false);
          setTimeout(() => dispatch({ type: 'DELETE_CARD', payload: { id } }), 50);
          return 0;
        }
        return prev - 200;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [dispatch, id]);

  const handleCardClick = () => {
    // setTimeLeft(countdown);
    dispatch({ type: 'UPDATE_COUNTDOWN', payload: { id } });
  };

  const progressPercent = (timeLeft / countdown) * 100;

  return (
    <div
      className={`${styles.card} ${isVisible ? styles.visible : styles.hidden}`}
      style={{ backgroundColor: `${color}` }}
      onClick={handleCardClick}
    >
      <p>{color}</p>
      <p>{`${timeLeft / 1000} s.`}</p>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Card;
