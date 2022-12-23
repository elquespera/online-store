import { useEffect, useState } from 'react';
import OneProduct from '../../components/OneProduct/OneProduct';
import { Product } from '../../http/interface';
import { getAllProducts } from '../../http/product';
import SelectInput from '../../components/SelectInput/SelectInput';
import styles from './StoreFrontPage.module.scss';

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res));
  }, []);

  const categories = Array.from({ length: 20 })
    .fill(0)
    .map(() => {
      return {
        title: [
          'groceries',
          'laptops',
          'smaptphones',
          'skincare',
          'home decorations',
        ][Math.floor(Math.random() * 5)],
        checked: Math.random() < 0.5,
        max: 5,
        found: Math.floor(Math.random() * 5),
      };
    });
  return (
    <div className={styles['store-front-page']}>
      <h2>Products</h2>
      {products ? (
        products.map((product) => (
          <OneProduct key={product.id} product={product} />
        ))
      ) : (
        <div>Products not found</div>
      )}
      <SelectInput title="Categories" options={categories} />
    </div>
  );
};

export default StoreFrontPage;
