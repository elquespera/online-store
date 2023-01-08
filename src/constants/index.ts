import { Promocode } from '../types';

export const ProductFilterOptions = {
  categories: 'categories',
  brands: 'brands',
  price: 'price',
  stock: 'stock',
  search: 'search',
  sort: 'sort',
  view: 'view',
} as const;

export enum ProductCategoryFields {
  category = 'category',
  brand = 'brand',
  price = 'price',
  stock = 'stock',
}

export const ProductSearchableFields = {
  title: 'title',
  description: 'description',
  price: 'price',
  discountPercentage: 'discountPercentage',
  rating: 'rating',
  stock: 'stock',
  brand: 'brand',
  category: 'category',
} as const;

export const ProductSortOptionList = [
  { id: 0, title: 'Sort Products' },
  { id: 1, title: 'Price ▲' },
  { id: 2, title: 'Price ▼' },
  { id: 3, title: 'Rating ▲' },
  { id: 4, title: 'Rating ▼' },
  { id: 5, title: 'Discount ▲' },
  { id: 6, title: 'Discount ▼' },
];

export const ProductSortValues = [
  '',
  'price-ascending',
  'price-descending',
  'rating-ascending',
  'rating-descending',
  'discount-ascending',
  'discount-descending',
];

export const ProductViewStyles = ['grid', 'compact', 'list'];

export const PARAMS_SEPARATOR = '↕';

export const ALL_PROMOCODES: Promocode[] = [
  { promo: 'rs', title: 'Rolling Scopes School', discount: 10 },
  { promo: 'epm', title: 'EPAM Systems', discount: 10 },
];

export const CART_ITEMS_KEY = 'cart-items';
