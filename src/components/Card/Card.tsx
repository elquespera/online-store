import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  big?: boolean;
  warn?: boolean;
  hover?: boolean;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  big,
  warn,
  hover,
}: CardProps) => {
  return (
    <div
      className={
        styles.card +
        (big ? ' ' + styles.big : '') +
        (warn ? ' ' + styles.warn : '') +
        (hover ? ' ' + styles.hover : '')
      }
    >
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Card;
