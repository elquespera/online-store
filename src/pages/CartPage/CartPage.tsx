import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from '../../components/Card/Card';
import CartPagination from '../../components/CartPagination/CartPagination';
import CartPromocode from '../../components/CartPromocode/CartPromocode';
import CartProductItem from '../../components/CartProductItem/CartProductItem';
import OrderModal from '../../components/OrderModal/OrderModal';
import { CartProductsContext } from '../../context';
import { Promocode } from '../../types';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const { cartProducts, showOrderModal, setShowOrderModal } =
    useContext(CartProductsContext);
  const [orderModalOpened, setOrderModalOpened] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [appliedPromocodes, setAppliedPromocodes] = useState<Promocode[]>([]);

  useEffect(() => {
    setOrderModalOpened(showOrderModal);
  }, []);

  const closeDialog = () => {
    setShowOrderModal(false);
    setOrderModalOpened(false);
  };

  const orderModalOnSuccess = () => {
    closeDialog();
    navigate('/');
  };

  const countTotalPrice = () => {
    return cartProducts.reduce(
      (sum, elem) => sum + elem.price * elem.quantity,
      0
    );
  };

  if (!cartProducts.length) {
    return <div className={styles['empty-cart']}>Cart is Empty</div>;
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-products']}>
        <div className={styles.header}>
          <h3>Products In Cart</h3>
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
            <CartProductItem
              key={product.id}
              product={product}
              index={index + 1}
            />
          );
        })}
      </div>
      <Card title="Summary" big>
        <div className={styles['cart-buy']}>
          <div>
            <div className={styles['quantity-products']}>
              Products: {cartProducts.length}
            </div>
            <div
              className={
                appliedPromocodes.length ? styles['old-price'] : styles.price
              }
            >
              Total: €{countTotalPrice()}
            </div>
          </div>
          <CartPromocode
            price={countTotalPrice()}
            appliedPromocodes={appliedPromocodes}
            setAppliedPromocodes={setAppliedPromocodes}
          />
          <button
            className={styles['btn-modal']}
            onClick={() => setOrderModalOpened(true)}
          >
            Buy now
          </button>
        </div>
      </Card>
      <OrderModal
        isOpened={orderModalOpened}
        onSuccess={orderModalOnSuccess}
        onCancel={closeDialog}
      />
    </div>
  );
};

export default CartPage;
