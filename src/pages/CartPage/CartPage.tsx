import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import OneProduct from '../../components/OneProduct/OneProduct';
import OrderModal from '../../components/OrderModal/OrderModal';
import { CartProductContent, CartProductsContext } from '../../context';
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
      <h2>Cart</h2>
      {cartProducts.map((cartProduct) => (
        <OneProduct key={cartProduct.id} product={cartProduct} />
      ))}
      <button onClick={() => setOrderModalOpened(true)}>Buy now</button>
      <OrderModal
        isOpened={orderModalOpened}
        onSuccess={orderModalOnSuccess}
        onCancel={() => setOrderModalOpened(false)}
      />
    </div>
  );
};

export default CartPage;
