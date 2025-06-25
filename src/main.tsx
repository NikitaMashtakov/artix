import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CardsProvider } from './contexts/CardsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <CardsProvider>
    <App />
  </CardsProvider>,
);
