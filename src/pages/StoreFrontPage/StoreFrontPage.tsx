import { useEffect, useState } from 'react';
import OneProduct from '../../components/OneProduct/OneProduct';
import {
  ProductCategoryFields,
  ProductFilterOptions,
  ProductSortOptionList,
  ProductSortValues,
  ProductViewStyles,
} from '../../constants';
import { Product, SelectOption } from '../../types';
import { ProductService } from '../../services/ProductsService/ProductService';
import Card from '../../components/Card/Card';
import RangeInput from '../../components/RangeInput/RangeInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import styles from './StoreFrontPage.module.scss';

import { useSearchParams } from 'react-router-dom';
import ViewSwitcher from '../../components/ViewSwitcher/ViewSwitcher';

const COPY_HINT_DURATION = 2000;

const writeSearchParams = (
  searchParams: URLSearchParams,
  field: string,
  value: string
) => {
  if (value === '') {
    searchParams.delete(field);
  } else {
    searchParams.set(field, value);
  }
};

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [brands, setBrands] = useState<SelectOption[]>([]);
  const [searchStr, setSearchStr] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [viewStyle, setViewStyle] = useState(ProductViewStyles[0]);
  const [copyHintVisible, setCopyHintVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let productFilters = ProductService.generateProductFilters(searchParams);

  useEffect(() => {
    setProducts(ProductService.getAll());
  }, []);

  useEffect(() => {
    updateFilters();
  }, [products, foundProducts]);

  useEffect(() => {
    productFilters = ProductService.generateProductFilters(searchParams);
    setFoundProducts(ProductService.filter(productFilters));
    updateFilters();
  }, [searchParams]);

  const updateFilters = () => {
    setCategories(
      ProductService.generateSelectData(
        products,
        foundProducts,
        ProductCategoryFields.category,
        productFilters.categories
      )
    );
    setBrands(
      ProductService.generateSelectData(
        products,
        foundProducts,
        ProductCategoryFields.brand,
        productFilters.brands
      )
    );
    setSearchStr(productFilters.search || '');
    setSortIndex(ProductSortValues.indexOf(productFilters.sort || ''));
    setViewStyle(productFilters.view || ProductViewStyles[0]);
  };

  const clearFilters = () => setSearchParams();

  const copyFilters = () => {
    if (copyHintVisible) return;
    navigator.clipboard.writeText(window.location.href);
    setCopyHintVisible(true);
    setTimeout(() => setCopyHintVisible(false), COPY_HINT_DURATION);
  };

  // Event Handles
  const filterChange = () => {
    writeSearchParams(
      searchParams,
      ProductFilterOptions.categories,
      ProductService.selectOptionsToString(categories)
    );
    writeSearchParams(
      searchParams,
      ProductFilterOptions.brands,
      ProductService.selectOptionsToString(brands)
    );
    setSearchParams(searchParams);
  };

  const searchInputChange = (str: string) => {
    writeSearchParams(searchParams, ProductFilterOptions.search, str);
    setSearchParams(searchParams);
  };

  const sortSelectChange = (index: number) => {
    writeSearchParams(
      searchParams,
      ProductFilterOptions.sort,
      ProductSortValues[index]
    );
    setSearchParams(searchParams);
  };

  const viewStyleChange = (style: string) => {
    writeSearchParams(searchParams, ProductFilterOptions.view, style);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles['store-front-page']}>
      <Card title="Filters">
        <div className={styles['filters-panel']}>
          <div className={styles['buttons-panel']}>
            <button
              className={'image-button ' + styles['clear-filters']}
              onClick={clearFilters}
            >
              Clear filters
            </button>
            <button
              className={
                'image-button ' +
                (copyHintVisible ? styles['copied'] + ' ' : '') +
                styles['copy-filters']
              }
              onClick={copyFilters}
            >
              Copy filters
            </button>
            <span className={styles['copy-hint']}>
              The url was copied to the clipboard!
            </span>
          </div>
          <SelectInput
            title="Categories"
            options={categories}
            onChange={filterChange}
          />
          <SelectInput
            title="Brands"
            options={brands}
            onChange={filterChange}
          />
          <RangeInput title="Price"></RangeInput>
          <RangeInput title="Stock"></RangeInput>
        </div>
      </Card>
      <Card title={`Products (${foundProducts.length})`}>
        <div className={styles['search-panel']}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchStr}
            onChange={(e) => searchInputChange(e.target.value)}
          />
          <select
            className={styles['sort-select']}
            value={ProductSortValues[sortIndex]}
            onChange={(e) => sortSelectChange(e.target.selectedIndex)}
          >
            {ProductSortOptionList.map(({ id, title }, index) => (
              <option key={id} value={ProductSortValues[index]}>
                {title}
              </option>
            ))}
          </select>
          <ViewSwitcher
            style={viewStyle}
            onChange={viewStyleChange}
          ></ViewSwitcher>
        </div>
        <div className={styles['products-panel']}>
          {foundProducts && foundProducts.length > 0 ? (
            foundProducts.map((product) => (
              <OneProduct key={product.id} product={product} />
            ))
          ) : (
            <div>Products not found</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StoreFrontPage;
