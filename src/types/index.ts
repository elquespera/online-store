import { ProductCategoryFields } from '../constants';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface MinMax {
  min: number;
  max: number;
}

export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  price?: MinMax;
  stock?: MinMax;
  search?: string | null;
}

export type ProductSelectField =
  | ProductCategoryFields.brand
  | ProductCategoryFields.category;

export interface SelectOption {
  title: string;
  checked: boolean;
  found: number;
  max: number;
}
