import { useEffect, useState } from 'react';
import { VIEW_STYLES } from '../../constants';
import styles from './ViewSwitcher.module.scss';

interface ViewSwitcherProps {
  style: string;
  onChange?: (style: string) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  style,
  onChange,
}: ViewSwitcherProps) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  useEffect(() => {
    const index = VIEW_STYLES.indexOf(style);
    setCheckedIndex(index > 0 && index < VIEW_STYLES.length ? index : 0);
  }, [style]);

  const styleChange = (index: number) => {
    setCheckedIndex(index);
    if (onChange) onChange(VIEW_STYLES[index]);
  };

  return (
    <div className={styles['view-switcher']}>
      {VIEW_STYLES.map((style, index) => (
        <button
          key={index}
          className={
            styles[style] + (checkedIndex === index ? ' ' + styles.checked : '')
          }
          title={style[0].toUpperCase() + style.slice(1)}
          onClick={() => styleChange(index)}
        ></button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
