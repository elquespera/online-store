import { useEffect, useState } from 'react';
import OneProduct from '../../components/OneProduct/OneProduct';
import { ProductCategoryFields } from '../../constants';
import { Product, SelectOption } from '../../types';
import { ProductService } from '../../services/ProductsService/ProductService';
import Card from '../../components/Card/Card';
import RangeInput from '../../components/RangeInput/RangeInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import styles from './StoreFrontPage.module.scss';

import { useSearchParams } from 'react-router-dom';

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [brands, setBrands] = useState<SelectOption[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  let productFilters = ProductService.generateProductFilters(searchParams);

  useEffect(() => {
    setProducts(ProductService.getAll());
  }, []);

  useEffect(() => {
    updateFilters();
  }, [products, foundProducts, searchParams]);

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
  };

  const filterChange = () => {
    setSearchParams(
      new URLSearchParams({
        categories: ProductService.selectOptionsToString(categories),
        brands: ProductService.selectOptionsToString(brands),
      })
    );
  };

  return (
    <div className={styles['store-front-page']}>
      <Card title="Filters">
        <div className={styles['filters-panel']}>
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
