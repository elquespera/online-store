import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import OneProduct from '../../components/OneProduct/OneProduct';
import OrderModal from '../../components/OrderModal/OrderModal';
import { CartProductContent, CartProductsContext } from '../../context';
import { Product } from '../../types';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const [orderModalOpened, setOrderModalOpened] = useState(false);
  const navigate = useNavigate();
  const { cartProducts }: CartProductContent = useContext(CartProductsContext);

  const orderModalOnSuccess = () => {
    setOrderModalOpened(false);
    navigate('/');
  };

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-products']}>
        {cartProducts.map((cartProduct) => (
          <OneProduct key={cartProduct.id} product={cartProduct} />
        ))}
      </div>
      <div className={styles['cart-buy']}>
        <h3>Summary</h3>
        <div className={styles['quantity-products']}>
          Products: {cartProducts.length}
        </div>
        <div>
          Total: €
          {cartProducts.reduce(
            (sum: number, elem: Product) => sum + elem.price,
            0
          )}
        </div>
        <button onClick={() => setOrderModalOpened(true)}>Buy now</button>
      </div>
      <OrderModal
        isOpened={orderModalOpened}
        onSuccess={orderModalOnSuccess}
        onCancel={() => setOrderModalOpened(false)}
      />
    </div>
  );
};

export default CartPage;
