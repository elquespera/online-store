import { createContext } from 'react';
import { CartProduct, Product } from '../types';

export type CartProductContent = {
  cartProducts: CartProduct[];
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
  cartProducts: [
    {
      id: 1,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [''],
      quantity: 0,
    },
  ],
  setCartProducts: () => ({}),
  addToCart: () => ({}),
  removeFromCart: () => ({}),
});
