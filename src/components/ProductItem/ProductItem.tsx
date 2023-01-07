import { MouseEventHandler, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartProductContent, CartProductsContext } from '../../context';
import { Product } from '../../types';
import { ProductViewStyles } from '../../constants';
import styles from './ProductItem.module.scss';
import Card from '../Card/Card';

interface Props {
  data: Product;
  style: string;
}

const ProductItem = ({ data, style }: Props) => {
  const {
    cartProducts,
    setCartProducts,
    addToCart,
    removeFromCart,
  }: CartProductContent = useContext(CartProductsContext);

  const inCart = cartProducts.find((product) => product.id === data.id);

  const generateButtons = () => {
    return (
      <div className={styles['buttons-panel']}>
        {inCart ? (
          <button onClick={(e) => removeFromCart(e, data)}>
            Remove from cart
          </button>
        ) : (
          <button onClick={(e) => addToCart(e, data)}>Add to cart</button>
        )}
      </div>
    );
  };

  return (
    <Link to={'product-details/' + data.id}>
      <div
        className={
          styles.product +
          (inCart ? ' ' + styles['in-cart'] : '') +
          ' ' +
          styles[style]
        }
      >
        {style === ProductViewStyles[2] ? (
          <div className={styles.list}>
            <img src={data.thumbnail} alt={data.title} />
            <div className={styles.title}>{data.title}</div>
            {generateButtons()}
          </div>
        ) : (
          <Card title={data.title}>
            <div
              className={
                style === ProductViewStyles[1] ? styles.compact : styles.grid
              }
            >
              <img src={data.thumbnail} alt={data.title} />
              {style !== ProductViewStyles[1] && (
                <div className={styles.description}>
                  <span>Category: {data.category}</span>
                  <span>Brand: {data.brand}</span>
                  <span>Price: €{data.price}</span>
                  <span>Discount: {data.discountPercentage}%</span>
                  <span>Rating: {data.rating}</span>
                  <span>Stock: {data.stock}</span>
                </div>
              )}
              {generateButtons()}
            </div>
          </Card>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
