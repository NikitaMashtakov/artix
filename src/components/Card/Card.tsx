import React, { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { getRandomColor } from '../../utils/getRandomColor';
import { getRandomCountdown } from '../../utils/getRandomCountdown';

type Props = {
  id: number;
  color: string;
  countdown: number;
};
let intervalId: number | undefined;
const color = getRandomColor();

const Card = ({}) => {
  // const [color, setColor] = useState('');
  const [countdown, setCountdown] = useState(getRandomCountdown());
  useEffect(() => {
    // setColor(getRandomColor());
    setInterval(() => {}, 1000);
  }, []);
  useEffect(() => {}, []);
  return (
    <div className={styles.container} style={{ backgroundColor: `${color}` }}>
      <p>color</p>
    </div>
  );
};

export default Card;
