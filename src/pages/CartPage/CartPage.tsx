import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import CartPagination from '../../components/CartPagination/CartPagination';
import CartPromocode from '../../components/CartPromocode/CartPromocode';
import OneProduct from '../../components/OneProduct/OneProduct';
import OrderModal from '../../components/OrderModal/OrderModal';
import { CartProductContent, CartProductsContext } from '../../context';
import { CartProduct, Promocode } from '../../types';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const [orderModalOpened, setOrderModalOpened] = useState(false);
  const navigate = useNavigate();
  const { cartProducts }: CartProductContent = useContext(CartProductsContext);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [appliedPromocodes, setAppliedPromocodes] = useState<Promocode[]>([]);

  const orderModalOnSuccess = () => {
    setOrderModalOpened(false);
    navigate('/');
  };

  if (!cartProducts.length) {
    return <div>Cart is Empty</div>;
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-products']}>
        <div className={styles.header}>
          <h2>Products In Cart</h2>
          <CartPagination
            setLimit={setLimit}
            limit={limit}
            setPage={setPage}
            page={page}
            cartProductsLength={cartProducts.length}
          />
        </div>
        {cartProducts.map((product, index) => {
          if (limit * (page - 1) > index || limit * page < index + 1) {
            return;
          }
          return (
            <OneProduct key={product.id} product={product} index={index + 1} />
          );
        })}
      </div>
      <div className={styles['cart-buy']}>
        <h3>Summary</h3>
        <div className={styles['quantity-products']}>
          Products: {cartProducts.length}
        </div>
        <div
          className={
            appliedPromocodes.length ? styles['cross-out'] : styles.price
          }
        >
          Total: €
          {cartProducts.reduce(
            (sum: number, elem: CartProduct) =>
              sum + elem.price * elem.quantity,
            0
          )}
        </div>
        <button onClick={() => setOrderModalOpened(true)}>Buy now</button>
        <CartPromocode
          price={cartProducts.reduce(
            (sum: number, elem: CartProduct) =>
              sum + elem.price * elem.quantity,
            0
          )}
          appliedPromocodes={appliedPromocodes}
          setAppliedPromocodes={setAppliedPromocodes}
        />
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
