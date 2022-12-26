import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartProductContent, CartProductsContext } from '../../context';
import { Product } from '../../http/interface';
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
        Total: $
        {cartProducts.reduce(
          (sum: number, elem: Product) => sum + elem.price,
          0
        )}
      </span>
      <Link to="cart">
        <div className={styles.cart}>
          <span className={styles['cart-icon']}></span>
          <span className={styles.badge}>{cartProducts.length}</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
