import type { ComponentProps, FC } from 'react';
import styles from './Button.module.css';

// interface IInputProps extends ComponentProps<'button'> {
// }

const Input: FC<ComponentProps<'input'>> = ({ ...props }) => {
  return <input className={styles.button} {...props} />;
};

export default Input;
