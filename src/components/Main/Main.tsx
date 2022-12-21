import styles from './Main.module.scss';
import { Route, Routes } from 'react-router-dom';
import StoreFront from '../../pages/StoreFrontPage/StoreFrontPage';
import CartPage from '../../pages/CartPage/CartPage';
import DetailsPage from '../../pages/DetailsPage/DetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const Main = () => {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="product-details/:id" element={<DetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Main;
