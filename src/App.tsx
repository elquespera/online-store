import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { CartProductsContext } from './context';
import { Product } from './types';

const App = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  return (
    <div className="App">
      <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
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
