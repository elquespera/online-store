import { createContext } from 'react';
import { Product } from '../http/interface';

export type CartProductContent = {
  cartProducts: Product[];
  setCartProducts: (products: Product[]) => void;
};

export const CartProductsContext = createContext<CartProductContent>({
  cartProducts: [
    {
      id: 2,
      title: '123',
      description: '123',
      price: 1,
      discountPercentage: 1,
      rating: 1,
      stock: 1,
      brand: '123',
      category: 'string',
      thumbnail: 'string',
      images: ['123', '123'],
    },
  ],
  setCartProducts: () => ({}),
});
