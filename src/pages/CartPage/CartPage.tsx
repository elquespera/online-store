import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import OneProduct from '../../components/OneProduct/OneProduct';
import OrderModal from '../../components/OrderModal/OrderModal';
import { CartProductContent, CartProductsContext } from '../../context';
import { CartProduct } from '../../types';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const [orderModalOpened, setOrderModalOpened] = useState(false);
  const navigate = useNavigate();
  const { cartProducts }: CartProductContent = useContext(CartProductsContext);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [maxPage, setMaxPage] = useState<number>(0);

  useEffect(() => {
    const limitCart = localStorage.getItem('cart-limit');
    const pageCart = localStorage.getItem('cart-page');
    if (limitCart) {
      setLimit(+limitCart);
    }

    if (pageCart) {
      setPage(+pageCart);
    }
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(cartProducts.length / limit);
    setMaxPage(totalPages);
    if (cartProducts.length && page >= totalPages) {
      setPage(totalPages);
      localStorage.setItem('cart-page', totalPages.toString());
    }
  }, [limit, cartProducts]);

  const orderModalOnSuccess = () => {
    setOrderModalOpened(false);
    navigate('/');
  };

  const changeLimitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const valueTarget = target.value;
    setLimit(+valueTarget);
    localStorage.setItem('cart-limit', valueTarget);
  };

  const nextPageHandler = () => {
    let nextPage = page + 1;

    if (nextPage >= maxPage) {
      nextPage = maxPage;
    }
    setPage(nextPage);
    localStorage.setItem('cart-page', nextPage.toString());
  };

  const previousPageHandler = () => {
    if (page === 1) {
      return;
    }
    const prevPage = page - 1;
    setPage(prevPage);
    localStorage.setItem('cart-page', prevPage.toString());
  };

  if (!cartProducts.length) {
    return <div>Cart is Empty</div>;
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-products']}>
        <div className={styles.header}>
          <h2>Products In Cart</h2>
          <div className={styles.pagination}>
            <div className={styles.limit}>
              Limit:
              <input
                type="number"
                onChange={changeLimitHandler}
                value={limit}
              />
            </div>
            <div className={styles.page}>
              Page:
              <button onClick={previousPageHandler}>&lt;</button>
              {page}
              <button onClick={nextPageHandler}>&gt;</button>
            </div>
          </div>
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
        <div>
          Total: €
          {cartProducts.reduce(
            (sum: number, elem: CartProduct) =>
              sum + elem.price * elem.quantity,
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
