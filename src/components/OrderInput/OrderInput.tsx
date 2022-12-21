import React, { useEffect, useRef, useState } from 'react';
import styles from './OrderInput.module.scss';

interface OrderInputProps {
  id: number;
  value: string;
  placeholder?: string;
  hint?: string;
  pattern: RegExp;
  valid: boolean;
  onChange: (id: number, value: string, pattern: RegExp) => void;
}

const OrderInput = ({
  id,
  value,
  placeholder,
  hint,
  valid,
  pattern,
  onChange,
}: OrderInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const validateInput = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (pattern) onChange(id, value, pattern);
    }
  };

  let containterClass = styles['order-input'];
  if (!valid) containterClass += ' ' + styles.invalid;

  return (
    <div className={containterClass} ref={containerRef}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        onInput={validateInput}
        onBlur={validateInput}
        value={value}
      />
      <span className={styles.hint}>{hint}</span>
    </div>
  );
};

export default OrderInput;
