import styles from './ProductProperty.module.scss';

interface ProductPropertyProps {
  name: string;
  value: string | number;
}

const ProductProperty: React.FC<ProductPropertyProps> = ({
  name,
  value,
}: ProductPropertyProps) => {
  return (
    <li className={styles.property}>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{value}</div>
    </li>
  );
};

export default ProductProperty;
