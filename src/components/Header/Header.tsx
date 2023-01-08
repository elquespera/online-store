import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CURRENCY_SIGN } from '../../constants';
import { CartProductContent, CartProductsContext } from '../../context';
import styles from './Header.module.scss';

const Header = () => {
  const { cartTotal, cartQuantity }: CartProductContent =
    useContext(CartProductsContext);
  return (
    <header className={styles.header}>
      <Link to="/">
        <span className={styles.logo}>
          <span className={styles.icon}></span>
          <span className={styles.text}>Online Store</span>
        </span>
      </Link>
      <span className={styles.total}>Total: {CURRENCY_SIGN + cartTotal()}</span>
      <Link to="cart">
        <div className={styles.cart}>
          <span className={styles['cart-icon']}></span>
          <span className={styles.badge}>{cartQuantity()}</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
