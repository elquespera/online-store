import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }: CardProps) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Card;
