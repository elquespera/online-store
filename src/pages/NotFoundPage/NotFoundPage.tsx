import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles['cart-page']} data-testid="not-found-page">
      <h2>404</h2>
      <p>The page you are looking for was not found.</p>
    </div>
  );
};

export default NotFoundPage;
