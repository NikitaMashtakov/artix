import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards, useCardsDispatch } from './contexts/CardsContext';
import Card from './components/Card/Card';
import * as yup from 'yup';
import { Error } from './components/Error/Error';
import { validateAndGetErrorMessage } from './utils/validateAndGetErrorMessage';

type ErrorState = {
  countError: string | null;
  periodError: string | null;
};

const countInputSchema = yup
  .number()
  .required('Поле не должно быть пустым')
  .min(1, 'Количество карточек должно быть больше 1')
  .max(1000, 'Количество карточек должно быть меньше 1000');
const periodInputSchema = yup
  .number()
  .required('Поле не должно быть пустым')
  .min(1, 'Интервал должнен быть больше 1 секунды')
  .max(10, 'Интервал должнен быть меньше 10 секунд');

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

  useEffect(() => {
    if (period === 0) return;

    if (isFirstGeneration) {
      dispatch({ type: 'ADD_CARDS', payload: { count: count } });
      setIsFirstGeneration(false);
    }

    let interval: number;
    if (isStarted && !isFirstGeneration) {
      interval = setInterval(() => {
        dispatch({ type: 'ADD_CARDS', payload: { count: count } });
      }, period);
    }

    return () => clearInterval(interval);
  }, [count, period, dispatch, isStarted, isFirstGeneration]);

  return (
    <div className={styles.container}>
      <Input
        label="Количество карточек:"
        id="count"
        type="text"
        value={count}
        onChange={({ target }) => {
          const value = Number(target.value);
          setCount(value);

          const validationError = validateAndGetErrorMessage(countInputSchema, value);
          setError((prev) => ({
            ...prev,
            countError: validationError,
          }));

          if (validationError) {
            setIsStarted(false);
          }
        }}
      />
      {error.countError ? <Error text={error.countError} /> : null}

      <Input
        label="Интервал:"
        id="period"
        type="text"
        value={period / 1000}
        onChange={({ target }) => {
          const value = Number(target.value);
          setPeriod(value * 1000);

          const validationError = validateAndGetErrorMessage(periodInputSchema, value);
          setError((prev) => ({
            ...prev,
            periodError: validationError,
          }));

          if (validationError) {
            setIsStarted(false);
          }
        }}
      />
      {error.periodError ? <Error text={error.periodError} /> : null}

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
