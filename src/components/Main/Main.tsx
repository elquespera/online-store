import styles from './Main.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import StoreFront from '../StoreFront/StoreFront';
import CartPage from '../CartPage/CartPage';

const Main = () => {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="product-details">
            <Route path=":product-id">Product Details Component</Route>
          </Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path="*">404 Component</Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Main;
