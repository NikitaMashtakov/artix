import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards, useCardsDispatch } from './contexts/CardsContext';
import Card from './components/Card/Card';
import { Error } from './components/Error/Error';

type ErrorState = {
  countError: string | null;
  periodError: string | null;
};

function App() {
  const [count, setCount] = useState<number>(1);
  const [period, setPeriod] = useState<number>(1000);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({ countError: null, periodError: null });
  const { cards } = useCards();
  const dispatch = useCardsDispatch();

  const handleStartStop = () => setIsStarted((prev) => !prev);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let interval: number;
    if (isStarted) {
      interval = setInterval(() => {
        dispatch({ type: 'ADD_CARDS', payload: { count: count } });
      }, period);
    }
    return () => clearInterval(interval);
  }, [count, period, dispatch, isStarted]);

  // useLayoutEffect(() => {
  //   const list = listRef.current;
  //   if (!list || cards.length === 0) return;

  //   const anchor = list.firstElementChild as HTMLElement | null;
  //   if (!anchor) return;

  //   const prevTop = anchor.getBoundingClientRect().top;

  //   requestAnimationFrame(() => {
  //     const newTop = anchor.getBoundingClientRect().top;
  //     const diff = newTop - prevTop;
  //     window.scrollBy({ top: diff });
  //   });
  // }, [cards.length]);

  return (
    <div className={styles.container}>
      <Input
        label="Количество карточек:"
        placeholder="count"
        type="text"
        value={count}
        onChange={({ target }) => {
          const value = Number(target.value);
          if (!isNaN(value)) {
            if (value > 0 && value <= 100) {
              setCount(value);
              setError((prev) => ({
                ...prev,
                countError: null,
              }));
            } else {
              setError((prev) => ({
                ...prev,
                countError: 'Значение должно быть от 1 до 100',
              }));
            }
          }
        }}
      />
      {error.countError ? <Error text={error.countError} /> : null}
      <Input
        label="Интервал:"
        placeholder="interval"
        type="text"
        value={period / 1000}
        onChange={({ target }) => {
          const value = Number(target.value);
          if (!isNaN(value)) {
            if (value < 0 && value >= 100) {
              setError((prev) => ({
                ...prev,
                periodError: 'Значение должно быть от 1 до 100',
              }));
            } else {
              setPeriod(value * 1000);
              setError((prev) => ({
                ...prev,
                periodError: null,
              }));
            }
          }
        }}
      />
      {error.periodError ? <Error text={error.periodError} /> : null}
      <Button label={isStarted ? 'Стоп' : 'Старт'} onClick={handleStartStop} />
      <div className={styles.cardsList} ref={listRef}>
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
