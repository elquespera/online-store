import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <span className={styles.logo}>
          <span className={styles.icon}></span>
          <span className={styles.text}>Online Store</span>
        </span>
      </Link>
      <span className={styles.total}>Total: $5000</span>
      <Link to="cart">
        <div className={styles.cart}>
          <span className={styles['cart-icon']}></span>
          <span className={styles.badge}>1</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
