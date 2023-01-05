import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartProductContent, CartProductsContext } from '../../context';
import { CartProduct } from '../../types';
import styles from './Header.module.scss';

const Header = () => {
  const { cartProducts }: CartProductContent = useContext(CartProductsContext);
  return (
    <header className={styles.header}>
      <Link to="/">
        <span className={styles.logo}>
          <span className={styles.icon}></span>
          <span className={styles.text}>Online Store</span>
        </span>
      </Link>
      <span className={styles.total}>
        Total: €
        {cartProducts.reduce(
          (sum: number, elem: CartProduct) => sum + elem.price * elem.quantity,
          0
        )}
      </span>
      <Link to="cart">
        <div className={styles.cart}>
          <span className={styles['cart-icon']}></span>
          <span className={styles.badge}>
            {cartProducts.reduce(
              (sum: number, elem: CartProduct) => sum + elem.quantity,
              0
            )}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
