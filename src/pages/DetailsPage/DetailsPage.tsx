import { useParams } from 'react-router';
import styles from './DetailsPage.module.scss';

const DetailsPage = () => {
  const { id } = useParams();
  return (
    <div className={styles['details-page']}>
      <h2>Details</h2>
      <p>Product id is {id}</p>
    </div>
  );
};

export default DetailsPage;
