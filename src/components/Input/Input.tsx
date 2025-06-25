import type { ComponentProps, FC } from 'react';
import styles from './Input.module.css';

// interface IInputProps extends ComponentProps<'button'> {
// }

const Input: FC<ComponentProps<'input'>> = ({ ...props }) => {
  return <input className={styles.button} {...props} />;
};

export default Input;
