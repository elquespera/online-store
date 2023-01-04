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
