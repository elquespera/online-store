export const ProductFilterOptions = {
  categories: 'categories',
  brands: 'brands',
  price: 'price',
  stock: 'stock',
  search: 'search',
} as const;

export enum ProductCategoryFields {
  category = 'category',
  brand = 'brand',
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

export const PARAMS_SEPARATOR = '↕';
