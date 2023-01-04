import {
  Product,
  ProductFilters,
  ProductSelectField,
  SelectOption,
} from '../../types';
import { ProductFilterOptions } from '../../constants';
import { PRODUCTS } from '../../data/Products';

export const ProductService = {
  getAll() {
    return PRODUCTS;
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

    return products;
  },

  generateProductFilters(searchParams: URLSearchParams): ProductFilters {
    // const Separator = '↕';
    const Separator = '$';
    const filterOptions: ProductFilters = {};

    const categories = searchParams.get(ProductFilterOptions.categories);
    if (categories) filterOptions.categories = categories.split(Separator);
    const brands = searchParams.get(ProductFilterOptions.brands);
    if (brands) filterOptions.brands = brands.split(Separator);
    const price = searchParams.get(ProductFilterOptions.price);
    if (price) {
      const min = +price.split(Separator)[0] || 0;
      const max = +price.split(Separator)[1] || 0;
      filterOptions.price = { min, max };
    }
    const stock = searchParams.get(ProductFilterOptions.stock);
    if (stock) {
      const min = +stock.split(Separator)[0] || 0;
      const max = +stock.split(Separator)[1] || 0;
      filterOptions.stock = { min, max };
    }

    filterOptions.search = searchParams.get(ProductFilterOptions.search);

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
      .join('$');
  },
};
