import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import { getCat } from './api/httpClient';
import Image from './components/Image/Image';
import Loader from './components/Loader/Loader';
import CheckboxInput from './components/CheckboxInput/CheckboxInput';
import styles from './App.module.css';
import Input from './components/Input/Input';
import { useCards } from './contexts/CardsContext';
import Card from './components/Card/Card';

let intervalId: number | undefined;

function App() {
  const [count, setCount] = useState(1);
  const [interval, setInterval] = useState(1);
  const cards = useCards();
  const handleStart = () => {};
  useEffect(() => {}, [count, interval]);
  return (
    <div className={styles.container}>
      <Input
        placeholder="count"
        type="number"
        onChange={({ target }) => setCount(Number(target.value))}
      />
      <Input
        placeholder="interval"
        type="number"
        onChange={({ target }) => setInterval(Number(target.value))}
      />
      <Button label={'Start'} onClick={handleStart} />
      {cards
        ? cards.map(({ id, color, countdown }) => (
            <Card key={id} id={id} color={color} countdown={countdown} />
          ))
        : null}
    </div>
  );
}

export default App;
