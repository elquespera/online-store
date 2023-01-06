import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CartPagination.module.scss';

type Props = {
  setLimit: (limit: number) => void;
  limit: number;
  setPage: (page: number) => void;
  page: number;
  cartProductsLength: number;
};

const CartPagination = ({
  setLimit,
  limit,
  setPage,
  page,
  cartProductsLength,
}: Props) => {
  const [maxPage, setMaxPage] = useState<number>(0);
  const [cartParams, setCartParams] = useSearchParams();

  useEffect(() => {
    const totalPages = Math.ceil(cartProductsLength / limit);
    let currentPage = page;
    setMaxPage(totalPages);
    if (cartProductsLength && page >= totalPages) {
      setPage(totalPages);
      currentPage = totalPages;
      localStorage.setItem('cart-page', totalPages.toString());
    }
    setCartParams({ page: currentPage.toString(), limit: limit.toString() });
  }, [limit, cartProductsLength]);

  useEffect(() => {
    const limitCart =
      cartParams.get('limit') || localStorage.getItem('cart-limit');
    const pageCart =
      cartParams.get('page') || localStorage.getItem('cart-page');
    if (limitCart) {
      setLimit(+limitCart);
      localStorage.setItem('cart-limit', limitCart);
    }

    if (pageCart) {
      setPage(+pageCart);
      localStorage.setItem('cart-page', pageCart);
    }

    if (pageCart && limitCart) {
      setCartParams({ page: pageCart, limit: limitCart });
    }
  }, []);

  const changeLimitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const valueTarget = target.value;
    setLimit(+valueTarget);
    localStorage.setItem('cart-limit', valueTarget);
    setCartParams({ page: page.toString(), limit: valueTarget });
  };

  const nextPageHandler = () => {
    let nextPage = page + 1;

    if (nextPage >= maxPage) {
      nextPage = maxPage;
    }
    setPage(nextPage);
    localStorage.setItem('cart-page', nextPage.toString());
    setCartParams({ page: nextPage.toString(), limit: limit.toString() });
  };

  const previousPageHandler = () => {
    if (page === 1) {
      return;
    }
    const prevPage = page - 1;
    setPage(prevPage);
    localStorage.setItem('cart-page', prevPage.toString());
    setCartParams({ page: prevPage.toString(), limit: limit.toString() });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.limit}>
        Limit:
        <input type="number" onChange={changeLimitHandler} value={limit} />
      </div>
      <div className={styles.page}>
        Page:
        <button onClick={previousPageHandler}>&lt;</button>
        {page}
        <button onClick={nextPageHandler}>&gt;</button>
      </div>
    </div>
  );
};

export default CartPagination;
