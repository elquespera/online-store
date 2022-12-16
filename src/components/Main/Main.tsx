import styles from './Main.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import StoreFront from '../../pages/StoreFrontPage/StoreFrontPage';
import CartPage from '../../pages/CartPage/CartPage';
import DetailsPage from '../../pages/DetailsPage/DetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

const Main = () => {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="product-details">
            <Route path=":id" element={<DetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Main;
