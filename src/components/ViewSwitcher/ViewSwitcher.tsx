import { useEffect, useState } from 'react';
import { ProductViewStyles } from '../../constants';
import styles from './ViewSwitcher.module.scss';

interface ViewSwitcherProps {
  style: string;
  onChange?: (style: string) => void;
}

const ViewButtons = [
  { id: 0, style: ProductViewStyles[0], title: 'Grid' },
  { id: 1, style: ProductViewStyles[1], title: 'Compact' },
  { id: 2, style: ProductViewStyles[2], title: 'List' },
];

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  style,
  onChange,
}: ViewSwitcherProps) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  useEffect(() => {
    const index = ProductViewStyles.indexOf(style);
    setCheckedIndex(index > 0 && index < ProductViewStyles.length ? index : 0);
  }, [style]);

  const styleChange = (index: number) => {
    setCheckedIndex(index);
    if (onChange) onChange(ProductViewStyles[index]);
  };

  return (
    <div className={styles['view-switcher']}>
      {ViewButtons.map(({ id, style, title }) => (
        <button
          key={id}
          className={
            styles[style] + (checkedIndex === id ? ' ' + styles.checked : '')
          }
          title={title}
          onClick={() => styleChange(id)}
        ></button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
