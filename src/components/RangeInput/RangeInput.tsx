import { useState } from 'react';
import Card from '../Card/Card';
import styles from './RangeInput.module.scss';

interface RangeInputProps {
  title?: string;
  min?: number;
  max?: number;
  from?: number;
  to?: number;
}

const RangeInput = ({
  title,
  min = 0,
  max = 100,
  from = 0,
  to = 100,
}: RangeInputProps) => {
  const [currentFrom, setFrom] = useState(from);
  const [currentTo, setTo] = useState(to);

  const rangeChange = (fromValue: number, toValue: number) => {
    setFrom(fromValue);
    setTo(toValue);
  };

  return (
    <Card title={title}>
      <div className={styles['range-input']}>
        <input
          className={styles.input}
          type="range"
          min={min}
          max={max}
          value={currentFrom}
          onChange={() => rangeChange(currentFrom, currentTo)}
        ></input>
        <input
          className={styles.input}
          type="range"
          min={min}
          max={max}
          value={currentTo}
          onChange={() => rangeChange(currentFrom, currentTo)}
        ></input>
      </div>
    </Card>
  );
};

export default RangeInput;
