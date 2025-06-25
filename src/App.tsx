import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards, useCardsDispatch } from './contexts/CardsContext';
import Card from './components/Card/Card';

function App() {
  const [count, setCount] = useState(1);
  const [period, setPeriod] = useState(1000);
  const [isStarted, setIsStarted] = useState(false);
  const { cards } = useCards();
  const dispatch = useCardsDispatch();

  const handleStartStop = () => setIsStarted((prev) => !prev);

  useEffect(() => {
    let interval: number;
    if (isStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'ADD_CARDS', payload: { count: count } });
      }, period);
    }
    return () => clearInterval(interval);
  }, [count, period, dispatch, isStarted]);

  return (
    <div className={styles.container}>
      <Input
        label="Количество карточек:"
        placeholder="count"
        type="text"
        value={count}
        onChange={({ target }) => {
          if (!isNaN(Number(target.value))) {
            setCount(Number(target.value));
          }
        }}
      />
      <Input
        label="Интервал:"
        placeholder="interval"
        type="text"
        value={period / 1000}
        onChange={({ target }) => {
          if (!isNaN(Number(target.value))) {
            setPeriod(Number(target.value) * 1000);
          }
        }}
      />
      <Button label={isStarted ? 'Стоп' : 'Старт'} onClick={handleStartStop} />
      <div className={styles.cardsList}>
        {cards
          ? cards.map(({ id, color, countdown }) => (
              <Card key={id} id={id} color={color} countdown={countdown} />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
