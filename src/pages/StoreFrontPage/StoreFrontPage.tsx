import { useEffect, useState } from 'react';
import OneProduct from '../../components/OneProduct/OneProduct';
import { Product } from '../../http/interface';
import { getAllProducts } from '../../http/product';
import styles from './StoreFrontPage.module.scss';

const StoreFrontPage = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res));
  }, []);

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
    </div>
  );
};

export default StoreFrontPage;
