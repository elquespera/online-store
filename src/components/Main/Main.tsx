import styles from './Main.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

const Main = () => {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/">Store Front Component</Route>
          <Route path="product-details">
            <Route path=":product-id">Product Details Component</Route>
          </Route>
          <Route path="cart">Cart Compontn</Route>
          <Route path="*">404 Component</Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Main;
