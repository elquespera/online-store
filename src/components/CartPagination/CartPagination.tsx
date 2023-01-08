import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CART_LIMIT_KEY, CART_PAGE_KEY } from '../../constants';
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
      localStorage.setItem(CART_PAGE_KEY, totalPages.toString());
    }
    setCartParams({ page: currentPage.toString(), limit: limit.toString() });
  }, [limit, cartProductsLength]);

  useEffect(() => {
    const limitCart =
      cartParams.get('limit') || localStorage.getItem(CART_LIMIT_KEY);
    const pageCart =
      cartParams.get('page') || localStorage.getItem(CART_PAGE_KEY);
    if (limitCart) {
      setLimit(+limitCart);
      localStorage.setItem(CART_LIMIT_KEY, limitCart);
    }

    if (pageCart) {
      setPage(+pageCart);
      localStorage.setItem(CART_PAGE_KEY, pageCart);
    }

    if (pageCart && limitCart) {
      setCartParams({ page: pageCart, limit: limitCart });
    }
  }, []);

  const changeLimitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    let valueTarget = target.value;
    if (+valueTarget <= 1) {
      valueTarget = '1';
    }
    setLimit(+valueTarget);
    localStorage.setItem(CART_LIMIT_KEY, valueTarget);
    setCartParams({ page: page.toString(), limit: valueTarget });
  };

  const nextPageHandler = () => {
    let nextPage = page + 1;
    if (nextPage >= maxPage) {
      nextPage = maxPage;
    }
    changePage(nextPage);
  };

  const previousPageHandler = () => {
    let prevPage = page - 1;
    if (page <= 1) {
      prevPage = 1;
    }
    changePage(prevPage);
  };

  const changePage = (page: number) => {
    setPage(page);
    localStorage.setItem(CART_PAGE_KEY, page.toString());
    setCartParams({ page: page.toString(), limit: limit.toString() });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.limit}>
        Limit:
        <input
          type="number"
          className={styles['input-limit']}
          onChange={changeLimitHandler}
          value={limit}
        />
      </div>
      <div className={styles.page}>
        Page:
        <button className={styles.btn} onClick={previousPageHandler}>
          &lt;
        </button>
        {page}
        <button className={styles.btn} onClick={nextPageHandler}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CartPagination;
