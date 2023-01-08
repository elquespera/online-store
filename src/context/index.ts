import { createContext } from 'react';
import { CartProduct, Product } from '../types';

export type CartProductContent = {
  cartProducts: CartProduct[];
  showOrderModal: boolean;
  setShowOrderModal: (show: boolean) => void;
  setCartProducts: (products: CartProduct[]) => void;
  addToCart: (
    event: React.MouseEvent<HTMLButtonElement>,
    data: Product
  ) => void;
  removeFromCart: (
    event: React.MouseEvent<HTMLButtonElement>,
    data: Product
  ) => void;
};

export const CartProductsContext = createContext<CartProductContent>({
  cartProducts: [],
  showOrderModal: false,
  setShowOrderModal: () => ({}),
  setCartProducts: () => ({}),
  addToCart: () => ({}),
  removeFromCart: () => ({}),
});
