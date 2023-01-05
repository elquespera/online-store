import { useContext } from 'react';
import { CartProductContent, CartProductsContext } from '../../context';
import { Product } from '../../types';
import styles from './OneProduct.module.scss';

const OneProduct = (props: { product: Product }) => {
  const { product } = props;
  const {
    cartProducts,
    setCartProducts,
    addToCart,
    removeFromCart,
  }: CartProductContent = useContext(CartProductsContext);

  const classes = cartProducts.includes(product) ? 'in-cart' : '';
  return (
    <div className={styles.product}>
      <div className={styles[classes]}>{product.title}</div>
      {classes !== 'in-cart' ? (
        <button onClick={(e) => addToCart(e, product)}>Add to cart</button>
      ) : (
        <button onClick={(e) => removeFromCart(e, product)}>
          Remove to cart
        </button>
      )}
    </div>
  );
};

export default OneProduct;
