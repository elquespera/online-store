import { useState } from 'react';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  images: string[];
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  images,
  title,
}: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const changeImageHandler = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const target = e.target as HTMLImageElement;
    const newSrc = target.src;
    setCurrentImage(newSrc);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.images}>
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt={`product ${title}`}
            className={
              styles.image +
              (image === currentImage ? ' ' + styles.current : '')
            }
            onClick={(e) => changeImageHandler(e)}
          />
        ))}
      </div>
      <img
        className={styles['current-image']}
        src={currentImage}
        alt={`current image ${title}`}
      />
    </div>
  );
};

export default ProductImage;
