import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards, useCardsDispatch } from './contexts/CardsContext';
import Card from './components/Card/Card';

let intervalId: number | undefined;

function App() {
  const [count, setCount] = useState(1);
  const [int, setInt] = useState(1000);
  const { cards } = useCards();
  const dispatch = useCardsDispatch();
  const handleStart = () => {
    setInterval(() => {
      dispatch({ type: 'ADD_CARDS', payload: { count: count } });
    }, int);
  };
  useEffect(() => {}, [count, int]);
  return (
    <div className={styles.container}>
      <Input
        placeholder="count"
        type="number"
        value={count}
        onChange={({ target }) => setCount(Number(target.value))}
      />
      <Input
        placeholder="interval"
        type="number"
        value={int}
        onChange={({ target }) => setInt(Number(target.value))}
      />
      <Button label={'Start'} onClick={handleStart} />
      <Button label={'Stop'} onClick={handleStop}} />

      {cards
        ? cards.map(({ id, color, countdown }) => (
            <Card key={id} id={id} color={color} countdown={countdown} />
          ))
        : null}
    </div>
  );
}

export default App;
