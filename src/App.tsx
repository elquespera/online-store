import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CartProductsContext } from './context';
import { CartProduct, Product } from './types';

const App = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: Product
  ) => {
    event.preventDefault();
    const newProductsInCart = [...cartProducts, { ...data, quantity: 1 }];
    setCartProducts(newProductsInCart);
    localStorage.setItem('cart-items', JSON.stringify(newProductsInCart));
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
    localStorage.setItem('cart-items', JSON.stringify(newProductsInCart));
  };

  useEffect(() => {
    const item = localStorage.getItem('cart-items');
    if (item) {
      setCartProducts(JSON.parse(item));
    }
  }, []);

  return (
    <div className="App">
      <CartProductsContext.Provider
        value={{ cartProducts, setCartProducts, removeFromCart, addToCart }}
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
