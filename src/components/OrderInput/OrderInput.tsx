import { useRef } from 'react';
import styles from './OrderInput.module.scss';

interface OrderInputProps {
  id: number;
  value: string;
  placeholder?: string;
  hint?: string;
  pattern: RegExp;
  valid: boolean;
  number?: boolean;
  onChange: (id: number, value: string, pattern: RegExp) => void;
}

const OrderInput = ({
  id,
  value,
  placeholder,
  hint,
  valid,
  pattern,
  number,
  onChange,
}: OrderInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (pattern) onChange(id, value, pattern);
    }
  };

  return (
    <div
      className={styles['order-input'] + (valid ? '' : ' ' + styles.invalid)}
    >
      <input
        ref={inputRef}
        inputMode={number ? 'numeric' : 'text'}
        placeholder={placeholder}
        onInput={validateInput}
        onBlur={validateInput}
        value={value}
        size={1}
      />
      <span className={styles.hint}>{hint}</span>
    </div>
  );
};

export default OrderInput;
