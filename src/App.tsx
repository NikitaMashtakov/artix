import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards, useCardsDispatch } from './contexts/CardsContext';
import Card from './components/Card/Card';
import * as yup from 'yup';
import { Error } from './components/Error/Error';

type ErrorState = {
  countError: string | null;
  periodError: string | null;
};

const countInputSchema = yup
  .number()
  .required()
  .min(1, 'Количество карточек должно быть больше 1')
  .max(1000, 'Количество карточек должно быть меньше 1000');
const periodInputSchema = yup
  .number()
  .required()
  .min(1, 'Интервал должнен быть больше 1 секунды')
  .max(10, 'Интервал должнен быть меньше 10 секунд');

const validateAndGetErrorMessage = (schema: yup.Schema, value: string | number) => {
  let errorMessage = null;

  try {
    schema.validateSync(value);
  } catch ({ errors }) {
    console.log(typeof errors);
    errorMessage = errors.reduce((message, error) => message + '').trim();
  }

  return errorMessage;
};

function App() {
  const [count, setCount] = useState<number>(1);
  const [period, setPeriod] = useState<number>(1000);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFirstGeneration, setIsFirstGeneration] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({ countError: null, periodError: null });
  const { cards } = useCards();
  const dispatch = useCardsDispatch();

  const handleStartStop = () => {
    setIsStarted((prev) => !prev);
    setIsFirstGeneration(true);
  };

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (period === 0) return;
    if (isFirstGeneration) {
      dispatch({ type: 'ADD_CARDS', payload: { count: count } });
      setIsFirstGeneration(false);
    }
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
          setCount(value);
          const newError = validateAndGetErrorMessage(countInputSchema, value);
          setError((prev) => ({
            ...prev,
            countError: newError,
          }));
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
          const newError = validateAndGetErrorMessage(periodInputSchema, value);
          setPeriod(value * 1000);
          setError((prev) => ({
            ...prev,
            periodError: newError,
          }));
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
