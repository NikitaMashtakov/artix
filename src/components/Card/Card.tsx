import React, { useEffect, useState, type FC } from 'react';
import styles from './Card.module.css';
import { getRandomColor } from '../../utils/getRandomColor';
import { getRandomCountdown } from '../../utils/getRandomCountdown';
import { useCardsDispatch } from '../../contexts/CardsContext';

type Props = {
  id: number;
  color: string;
  countdown: number;
};
let tim: number | undefined;
const color = getRandomColor();

const Card: FC<Props> = ({ id, color, countdown }) => {
  // const [color, setColor] = useState('');
  // const [countdown, setCountdown] = useState(getRandomCountdown());
  const dispatch = useCardsDispatch();
  useEffect(() => {
    // setColor(getRandomColor());
    setInterval(() => {}, 1000);
  }, []);
  useEffect(() => {}, []);
  se;
  const handleCardClick = (id) => {
    // dispatch();
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: `${color}` }}
      onClick={handleCardClick(id)}
    >
      <p>{color}</p>
      <p>{countdown}</p>
    </div>
  );
};

export default Card;
