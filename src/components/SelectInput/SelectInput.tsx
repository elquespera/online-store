import { useEffect, useState } from 'react';
import { SelectOption } from '../../types';
import Card from '../Card/Card';
import styles from './SelectInput.module.scss';

interface SelectInputProps {
  title?: string;
  options: SelectOption[];
  onChange?: (index: number, checked: boolean) => void;
}

const SelectInput = ({ title, options, onChange }: SelectInputProps) => {
  const [optionsList, setOptionsList] = useState(options);

  useEffect(() => {
    setOptionsList(options);
  }, [options]);

  const randomId = Math.floor(Math.random() * 100000);

  const optionChange = (index: number) => {
    optionsList[index].checked = !optionsList[index].checked;
    setOptionsList([...optionsList]);
    if (onChange) onChange(index, optionsList[index].checked);
  };

  return (
    <Card title={title}>
      <ul className={styles['select-input']}>
        {optionsList.map((option, index) => {
          const inputId = `select_option_${randomId}_${index}`;
          return (
            <li key={index}>
              <label htmlFor={inputId}>
                <input
                  className={option.found <= 0 ? styles.disabled : ''}
                  id={inputId}
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => optionChange(index)}
                />
                <span>{option.title}</span>
                <span className={styles['found-max']}>
                  ({option.found}/{option.max})
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default SelectInput;
