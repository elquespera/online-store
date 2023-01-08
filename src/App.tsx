import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CART_ITEMS_KEY } from './constants';
import { CartProductsContext } from './context';
import { CartProduct, Product } from './types';

const App = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: Product
  ) => {
    event.preventDefault();
    const newProductsInCart = [...cartProducts, { ...data, quantity: 1 }];
    setCartProducts(newProductsInCart);
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newProductsInCart));
  };

  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: Product
  ) => {
    event.preventDefault();
    const newProductsInCart = [
      ...cartProducts.filter((cartProduct) => cartProduct.id !== data.id),
    ];
    setCartProducts(newProductsInCart);
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(newProductsInCart));
  };

  const productInCart = (product?: Product): boolean => {
    if (!product) return false;
    return cartProducts.find(({ id }) => product.id === id) !== undefined;
  };

  useEffect(() => {
    const item = localStorage.getItem(CART_ITEMS_KEY);
    if (item) {
      setCartProducts(JSON.parse(item));
    }
  }, []);

  return (
    <div className="App">
      <CartProductsContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          removeFromCart,
          addToCart,
          productInCart,
          showOrderModal,
          setShowOrderModal,
        }}
      >
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </CartProductsContext.Provider>
    </div>
  );
};

export default App;
