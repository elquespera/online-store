import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CART_ITEMS_KEY } from '../../constants';
import { CartProductContent, CartProductsContext } from '../../context';
import { CartProduct } from '../../types';
import styles from './CartProductItem.module.scss';

interface Props {
  product: CartProduct;
  index: number;
}

const CartProductItem: React.FC<Props> = ({ product, index }: Props) => {
  const { cartProducts, setCartProducts, removeFromCart }: CartProductContent =
    useContext(CartProductsContext);
  const navigate = useNavigate();

  const addQuantityHandler = () => {
    if (product.quantity + 1 > product.stock) {
      return;
    }
    const newProductsInCart = cartProducts.map((prod) => {
      if (prod.id === product.id) {
        return { ...prod, quantity: product.quantity + 1 };
      }
      return prod;
    });
    setCartProducts(newProductsInCart);
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newProductsInCart));
  };

  const removeQuantityHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (product.quantity === 1) {
      removeFromCart(e, product);
      return;
    }
    const newProductsInCart = cartProducts.map((prod) => {
      if (prod.id === product.id) {
        return { ...prod, quantity: product.quantity - 1 };
      }
      return prod;
    });
    setCartProducts(newProductsInCart);
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newProductsInCart));
  };

  const navigateToDetailsPage = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div className={styles.product}>
      <div className={styles.order}>{index}</div>
      <img
        className={styles['product-image']}
        src={product.images[0]}
        alt={`image ${product.title}`}
        onClick={navigateToDetailsPage}
      />
      <div className={styles['item-info']} onClick={navigateToDetailsPage}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.other}>
          <div className={styles.rating}>Rating: {product.rating}</div>
          <div className={styles.discount}>
            Discount: {product.discountPercentage}%
          </div>
        </div>
      </div>
      <div className={styles['wrapper-quantity']}>
        <div className={styles.stock}>Stock: {product.stock}</div>
        <div className={styles.quantity}>
          <button
            className={styles['add-quantity']}
            onClick={addQuantityHandler}
          >
            +
          </button>
          <span>{product.quantity}</span>
          <button
            className={styles['remove-quantity']}
            onClick={removeQuantityHandler}
          >
            -
          </button>
        </div>
        <div className={styles.price}>
          €{(product.price * product.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
