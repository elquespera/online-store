import { useEffect, useState } from 'react';
import OneProduct from '../../components/OneProduct/OneProduct';
import { Product } from '../../http/interface';
import { getAllProducts } from '../../http/product';
import Card from '../../components/Card/Card';
import RangeInput from '../../components/RangeInput/RangeInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import styles from './StoreFrontPage.module.scss';

const mockSelect = (titles: string[], max: number, length = 20) => {
  return Array.from({ length })
    .fill(0)
    .map(() => {
      return {
        title: titles[Math.floor(Math.random() * titles.length)],
        checked: Math.random() < 0.5,
        max,
        found: Math.floor(Math.random() * max),
      };
    });
};

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res));
  }, []);

  const categories = mockSelect(
    ['groceries', 'laptops', 'smaptphones', 'skincare', 'home decorations'],
    5,
    20
  );
  const brands = mockSelect(['Apple', 'Samsung', 'Oppo', 'HP Pavilion'], 8, 25);
  return (
    <div className={styles['store-front-page']}>
      <Card title="Filters">
        <div className={styles['filters-panel']}>
          <SelectInput title="Categories" options={categories} />
          <SelectInput title="Brands" options={brands} />
          <RangeInput title="Price"></RangeInput>
          <RangeInput title="Stock"></RangeInput>
        </div>
      </Card>
      <Card title="Products">
        <div className={styles['products-panel']}>
          {products ? (
            products.map((product) => (
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
