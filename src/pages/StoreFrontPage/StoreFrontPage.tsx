import { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import {
  CURRENCY_SIGN,
  ProductCategoryFields,
  ProductFilterOptions,
  ProductSortOptionList,
  ProductSortValues,
  VIEW_STYLES,
} from '../../constants';
import { MinMax, Product, SelectOption } from '../../types';
import { ProductService } from '../../services/ProductService';
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
  const [priceRange, setPriceRange] = useState<MinMax>();
  const [priceValue, setPriceValue] = useState<MinMax>();
  const [stockRange, setStockRange] = useState<MinMax>();
  const [stockValue, setStockValue] = useState<MinMax>();
  const [searchStr, setSearchStr] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [viewStyle, setViewStyle] = useState(VIEW_STYLES[0]);
  const [copyHintVisible, setCopyHintVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let productFilters = ProductService.generateProductFilters(searchParams);

  useEffect(() => {
    const products = ProductService.getAll();
    const priceRange = ProductService.calculateRange(
      products,
      ProductCategoryFields.price
    );
    setPriceRange(priceRange);
    setPriceValue({ ...priceRange });
    const stockRange = ProductService.calculateRange(
      products,
      ProductCategoryFields.stock
    );
    setStockRange(stockRange);
    setStockValue({ ...stockRange });

    setProducts(products);
  }, []);

  useEffect(() => {
    updateFilters();
  }, [foundProducts]);

  useEffect(() => {
    productFilters = ProductService.generateProductFilters(searchParams);
    setFoundProducts(ProductService.filter(productFilters));
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
    setPriceValue(
      ProductService.calculateRange(
        foundProducts,
        ProductCategoryFields.price,
        productFilters.price
      )
    );
    setStockValue(
      ProductService.calculateRange(
        foundProducts,
        ProductCategoryFields.stock,
        productFilters.stock
      )
    );
    setSearchStr(productFilters.search || '');
    setSortIndex(ProductSortValues.indexOf(productFilters.sort || ''));
    setViewStyle(productFilters.view || VIEW_STYLES[0]);
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

  const priceValueChange = (value: MinMax) => {
    writeSearchParams(
      searchParams,
      ProductFilterOptions.price,
      ProductService.rangeToString(value)
    );
    setSearchParams(searchParams);
  };

  const stockValueChange = (value: MinMax) => {
    writeSearchParams(
      searchParams,
      ProductFilterOptions.stock,
      ProductService.rangeToString(value)
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
    <div className={styles['store-front-page']} data-testid="store-front-page">
      <Card title="Filters" big>
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
          <RangeInput
            title="Price"
            range={priceRange}
            value={priceValue}
            prefix={CURRENCY_SIGN}
            onChange={priceValueChange}
          ></RangeInput>
          <RangeInput
            title="Stock"
            range={stockRange}
            value={stockValue}
            onChange={stockValueChange}
          ></RangeInput>
        </div>
      </Card>
      <Card title={`Products (${foundProducts.length})`} big>
        <div className={styles['search-panel']}>
          <input
            className={styles['search-input']}
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
        <div className={styles['products-panel'] + ' ' + styles[viewStyle]}>
          {foundProducts && foundProducts.length > 0 ? (
            foundProducts.map((product) => (
              <ProductItem key={product.id} data={product} style={viewStyle} />
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
