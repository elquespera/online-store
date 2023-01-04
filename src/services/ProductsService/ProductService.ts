import {
  Product,
  ProductFilters,
  ProductIndex,
  ProductSelectField,
  SelectOption,
} from '../../types';
import {
  ProductFilterOptions,
  PARAMS_SEPARATOR,
  ProductSearchableFields,
  ProductSortValues,
} from '../../constants';
import { PRODUCTS } from '../../data/Products';

export const ProductService = {
  getAll() {
    return [...PRODUCTS];
  },

  countField(data: Product[], field: ProductSelectField) {
    const fieldData: { [key: string]: number } = {};
    data.forEach((product) => {
      fieldData[product[field]] === undefined
        ? (fieldData[product[field]] = 1)
        : (fieldData[product[field]] += 1);
    });
    return fieldData;
  },

  filter(filters: ProductFilters) {
    let products = this.getAll();
    if (filters.categories)
      products = products.filter((product) =>
        filters.categories?.includes(product.category)
      );

    if (filters.brands)
      products = products.filter((product) =>
        filters.brands?.includes(product.brand)
      );

    if (typeof filters.search === 'string') {
      const searchStr = filters.search.toLowerCase();
      products = products.filter((product) => {
        const prod = product as ProductIndex;
        return Object.keys(ProductSearchableFields).some((field) => {
          const value = prod[field];
          return value.toString().toLowerCase().includes(searchStr);
        });
      });
    }

    if (filters.sort && ProductSortValues.includes(filters.sort))
      products = products.sort((a, b) => {
        switch (filters.sort) {
          case ProductSortValues[1]:
            return a.price - b.price;
          case ProductSortValues[2]:
            return b.price - a.price;
          case ProductSortValues[3]:
            return a.rating - b.rating;
          case ProductSortValues[4]:
            return b.rating - a.rating;
          case ProductSortValues[5]:
            return a.discountPercentage - b.discountPercentage;
          case ProductSortValues[6]:
            return b.discountPercentage - a.discountPercentage;
        }
        return 0;
      });

    return products;
  },

  generateProductFilters(searchParams: URLSearchParams): ProductFilters {
    const filterOptions: ProductFilters = {};

    const categories = searchParams.get(ProductFilterOptions.categories);
    if (categories)
      filterOptions.categories = categories.split(PARAMS_SEPARATOR);
    const brands = searchParams.get(ProductFilterOptions.brands);
    if (brands) filterOptions.brands = brands.split(PARAMS_SEPARATOR);
    const price = searchParams.get(ProductFilterOptions.price);
    if (price) {
      const min = +price.split(PARAMS_SEPARATOR)[0] || 0;
      const max = +price.split(PARAMS_SEPARATOR)[1] || 0;
      filterOptions.price = { min, max };
    }
    const stock = searchParams.get(ProductFilterOptions.stock);
    if (stock) {
      const min = +stock.split(PARAMS_SEPARATOR)[0] || 0;
      const max = +stock.split(PARAMS_SEPARATOR)[1] || 0;
      filterOptions.stock = { min, max };
    }

    filterOptions.search =
      searchParams.get(ProductFilterOptions.search) || undefined;

    filterOptions.sort =
      searchParams.get(ProductFilterOptions.sort) || undefined;

    return filterOptions;
  },

  generateSelectData(
    all: Product[],
    found: Product[],
    field: ProductSelectField,
    selected?: string[]
  ): SelectOption[] {
    const foundFileds = this.countField(found, field);
    const allFields = this.countField(all, field);

    return Object.keys(allFields).map((key) => {
      return {
        title: key,
        checked: selected !== undefined && selected.includes(key),
        max: allFields[key],
        found: foundFileds[key] || 0,
      };
    });
  },

  selectOptionsToString(selectOptions: SelectOption[]): string {
    return selectOptions
      .filter((option) => option.checked)
      .map(({ title }) => title)
      .join(PARAMS_SEPARATOR);
  },
};
