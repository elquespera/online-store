import React, { useEffect, useState, useContext } from 'react';
import { CartProductContent, CartProductsContext } from '../../context';
import { useNavigate, useParams } from 'react-router';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductProperty from '../../components/ProductProperty/ProductProperty';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../types';
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {
  const { cartProducts, addToCart, removeFromCart }: CartProductContent =
    useContext(CartProductsContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const unusedProperties = ['id', 'title', 'thumbnail', 'images', 'price'];

  useEffect(() => {
    if (typeof id === 'string') {
      setProduct(ProductService.getOne(+id));
    }
  }, []);

  const buyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (product) {
      addToCart(event, product);
    }
    navigate('/cart');
  };

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
          {product?.images && (
            <ProductImage images={product?.images} title={product?.title} />
          )}
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
          <div className={styles['wrapper-price']}>
            <div className={styles.price}>€{product?.price}</div>
            {product &&
              (id && cartProducts.find((p) => p.id === +id) ? (
                <button
                  onClick={(e) => removeFromCart(e, product)}
                  className={styles['btn']}
                >
                  {'REMOVE FROM CART'}
                </button>
              ) : (
                <button
                  onClick={(e) => addToCart(e, product)}
                  className={styles['btn']}
                >
                  {'ADD TO CART'}
                </button>
              ))}
            <button onClick={buyHandler} className={styles['btn']}>
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
