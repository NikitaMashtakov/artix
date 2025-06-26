import type { FC } from 'react';
import styles from './Error.module.css';

type Props = {
  text: string;
};
export const Error: FC<Props> = ({ text }) => {
  return <div className={styles.container}>{text}</div>;
};
