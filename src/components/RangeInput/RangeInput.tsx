import { useEffect, useState } from 'react';
import { MinMax } from '../../types';
import Card from '../Card/Card';
import styles from './RangeInput.module.scss';

interface RangeInputProps {
  title?: string;
  range?: MinMax;
  value?: MinMax;
  prefix?: string;
  onChange?: (value: MinMax) => void;
}

const RangeInput = ({
  title,
  range,
  value,
  prefix,
  onChange,
}: RangeInputProps) => {
  const [current, setCurrent] = useState<MinMax>();

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const rangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    second = false
  ) => {
    const currentValue = +event.target.value;
    if (value) {
      if (second) value.max = currentValue;
      else value.min = currentValue;
      setCurrent({ ...value });
      if (onChange) onChange(value);
    }
  };

  return (
    <Card title={title}>
      <div className={styles.wrapper}>
        <div>
          {current?.min === -Infinity || current?.min === Infinity ? (
            <div>NOT FOUND</div>
          ) : (
            <div className={styles['labels']}>
              <span>
                {prefix}
                {Math.min(current?.min || 0, current?.max || 100)}
              </span>
              <span>
                {prefix}
                {Math.max(current?.min || 0, current?.max || 100)}
              </span>
            </div>
          )}
        </div>
        <div className={styles['range-input']}>
          <input
            className={styles.input}
            type="range"
            min={range?.min || 0}
            max={range?.max || 100}
            value={current?.min || 0}
            onChange={(e) => rangeChange(e)}
          ></input>
          <input
            className={styles.input + ' ' + styles.second}
            type="range"
            min={range?.min || 0}
            max={range?.max || 100}
            value={current?.max || 100}
            onChange={(e) => rangeChange(e, true)}
          ></input>
        </div>
      </div>
    </Card>
  );
};

export default RangeInput;
