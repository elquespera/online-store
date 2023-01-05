import { useContext } from 'react';
import { CartProductContent, CartProductsContext } from '../../context';
import { Product } from '../../types';
import styles from './OneProduct.module.scss';

const OneProduct = (props: { product: Product }) => {
  const { product } = props;
  const { cartProducts, setCartProducts }: CartProductContent =
    useContext(CartProductsContext);
  function addToCartHandler() {
    setCartProducts([...cartProducts, product]);
  }

  function removeToCartHandler() {
    setCartProducts([
      ...cartProducts.filter((cartProduct) => cartProduct.id !== product.id),
    ]);
  }

  const classes = cartProducts.includes(product) ? 'in-cart' : '';
  return (
    <div className={styles.product}>
      <div className={styles[classes]}>{product.title}</div>
      {classes !== 'in-cart' ? (
        <button onClick={addToCartHandler}>Add to cart</button>
      ) : (
        <button onClick={removeToCartHandler}>Remove to cart</button>
      )}
    </div>
  );
};

export default OneProduct;
