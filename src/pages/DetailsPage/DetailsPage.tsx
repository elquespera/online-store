import React, { useEffect, useState, useContext } from 'react';
import { CartProductContent, CartProductsContext } from '../../context';
import { useNavigate, useParams } from 'react-router';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductProperty from '../../components/ProductProperty/ProductProperty';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../types';
import styles from './DetailsPage.module.scss';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

const DetailsPage = () => {
  const {
    cartProducts,
    addToCart,
    removeFromCart,
    setShowOrderModal,
  }: CartProductContent = useContext(CartProductsContext);
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
    setShowOrderModal(true);
    navigate('/cart');
  };

  const inCart = id && cartProducts.find((product) => product.id === +id);

  return (
    <div className={styles['details-page']}>
      <Card big title="Details">
        <div className={styles['bread-crumbs']}>
          <Link className={styles['store']} to="/">
            STORE
          </Link>
          <div className={styles.next}></div>
          <div>{product?.category.toUpperCase()}</div>
          <div className={styles.next}></div>
          <div>{product?.brand.toUpperCase()}</div>
          <div className={styles.next}></div>
          <div>{product?.title.toUpperCase()}</div>
        </div>
        <div className={styles['wrapper-info']}>
          {product?.images && (
            <ProductImage images={product?.images} title={product?.title} />
          )}
          <div className={styles.properties}>
            <h2>{product?.title}</h2>
            <ul>
              {product &&
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
            </ul>
            <div className={styles['wrapper-price']}>
              <div className={styles.price}>€{product?.price}</div>
              {product &&
                (inCart ? (
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
      </Card>
    </div>
  );
};

export default DetailsPage;
