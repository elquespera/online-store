import { useState } from 'react';
import { useNavigate } from 'react-router';
import OrderModal from '../../components/OrderModal/OrderModal';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const [orderModalOpened, setOrderModalOpened] = useState(false);
  const navigate = useNavigate();

  const orderModalOnSuccess = () => {
    setOrderModalOpened(false);
    navigate('/');
  };

  return (
    <div className={styles['cart-page']}>
      <h2>Cart</h2>
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
