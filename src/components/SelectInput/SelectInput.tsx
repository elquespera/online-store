import { useState } from 'react';
import Card from '../Card/Card';
import styles from './SelectInput.module.scss';

interface SelectOption {
  title: string;
  checked: boolean;
  found: number;
  max: number;
}

export type SelectOptions = Array<SelectOption>;

interface SelectInputProps {
  title?: string;
  options: SelectOptions;
  onChange?: (index: number, checked: boolean) => void;
}

const SelectInput = ({ title, options, onChange }: SelectInputProps) => {
  const [optionsList, setOptionsList] = useState(options);

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
                  id={inputId}
                  type="checkbox"
                  checked={option.checked}
                  disabled={option.found <= 0}
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
