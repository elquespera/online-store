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
import { CURRENCY_SIGN, ProductHiddenFields } from '../../constants';

const DetailsPage = () => {
  const {
    addToCart,
    removeFromCart,
    setShowOrderModal,
    productInCart,
  }: CartProductContent = useContext(CartProductsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (typeof id === 'string') {
      setProduct(ProductService.getOne(+id));
    }
  }, []);

  const buyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (product && !productInCart(product)) {
      addToCart(event, product);
    }
    setShowOrderModal(true);
    navigate('/cart');
  };

  return (
    <div className={styles['details-page']}>
      {product ? (
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
                    if (!ProductHiddenFields.includes(prop[0]))
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
                <div className={styles.price}>
                  {CURRENCY_SIGN + product?.price}
                </div>
                {product &&
                  (productInCart(product) ? (
                    <button
                      onClick={(e) => removeFromCart(e, product)}
                      className={styles['btn-remove']}
                    >
                      REMOVE FROM CART
                    </button>
                  ) : (
                    <button onClick={(e) => addToCart(e, product)}>
                      ADD TO CART
                    </button>
                  ))}
                <button onClick={buyHandler}>BUY NOW</button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div>
          Product with id of <b>{id}</b> was not found.
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
