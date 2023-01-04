import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductProperty from '../../components/ProductProperty/ProductProperty';
import { Product } from '../../types';
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const unusedProperties = ['id', 'title', 'thumbnail', 'images', 'price'];

  useEffect(() => {
    // if (typeof id === 'string') {
    //   getProductById(id).then((res) => setProduct(res));
    // }
  }, []);

  return (
    <div className={styles['details-page']}>
      <h2>Details</h2>
      <div className={styles['bread-crumbs']}>
        <div className={styles['store']} onClick={() => navigate('/')}>
          STORE
        </div>
        <div>&#62;&#62;</div>
        <div>{product?.category.toUpperCase()}</div>
        <div>&#62;&#62;</div>
        <div>{product?.brand.toUpperCase()}</div>
        <div>&#62;&#62;</div>
        <div>{product?.title.toUpperCase()}</div>
      </div>
      <div className={styles['details-product']}>
        <div className={styles['title']}>{product?.title}</div>
        <div className={styles['wrapper-info']}>
          {product?.images && <ProductImage images={product?.images} />}
          <div className={styles.property}>
            {typeof product === 'object' &&
              Object.entries(product).map((prop) => {
                if (unusedProperties.includes(prop[0])) {
                  return;
                }
                return (
                  <ProductProperty
                    key={prop[0]}
                    name={prop[0]}
                    value={prop[1]}
                  />
                );
              })}
          </div>
          <div className={styles.price}>
            <div>€{product?.price}</div>
            <button>ADD TO CART</button>
            <button>BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
