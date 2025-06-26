import type { ComponentProps, FC } from 'react';
import styles from './Input.module.css';

interface IInputProps extends ComponentProps<'input'> {
  label: string;
}

const Input: FC<IInputProps> = ({ label, ...props }) => {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <input className={styles.input} {...props} />
    </>
  );
};

export default Input;
