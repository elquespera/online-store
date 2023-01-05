import { createContext } from 'react';
import { Product } from '../types';

export type CartProductContent = {
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
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
    },
  ],
  setCartProducts: () => ({}),
});
