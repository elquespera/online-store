import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  big?: boolean;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, big }: CardProps) => {
  return (
    <div className={styles.card + (big ? ' ' + styles.big : '')}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Card;
