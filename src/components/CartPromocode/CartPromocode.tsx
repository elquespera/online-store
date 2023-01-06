import { useEffect, useState } from 'react';
import styles from './CartPromocode.module.scss';
import { ALL_PROMOCODES } from '../../constants';
import { Promocode } from '../../types';

interface Props {
  price: number;
  appliedPromocodes: Promocode[];
  setAppliedPromocodes: (promo: Promocode[]) => void;
}

const CartPromocode = ({
  price,
  appliedPromocodes,
  setAppliedPromocodes,
}: Props) => {
  const [promocode, setPromocode] = useState('');

  useEffect(() => {
    const storagePromocode = localStorage.getItem('cart-promocodes');
    if (storagePromocode) {
      setAppliedPromocodes(JSON.parse(storagePromocode));
    }
  }, []);

  const addPromoHandler = (promo: Promocode) => {
    setAppliedPromocodes([...appliedPromocodes, promo]);
    localStorage.setItem(
      'cart-promocodes',
      JSON.stringify([...appliedPromocodes, promo])
    );
    setPromocode('');
  };

  const removePromoHandler = (apliedPromo: Promocode) => {
    const updatePromo = appliedPromocodes.filter(
      (p) => p.promo !== apliedPromo.promo
    );
    setAppliedPromocodes(updatePromo);
    localStorage.setItem('cart-promocodes', JSON.stringify(updatePromo));
  };

  return (
    <>
      {appliedPromocodes.length !== 0 && (
        <div className={styles['new-price']}>
          Total: €
          {(
            price -
            (price *
              appliedPromocodes.reduce(
                (sum: number, elem: Promocode) => sum + elem.discount,
                0
              )) /
              100
          ).toFixed(2)}
        </div>
      )}
      <div className={styles.promocode}>
        {appliedPromocodes.length !== 0 && (
          <div className={styles['applied-promo']}>
            <h4>Applied codes</h4>
            {appliedPromocodes.map((apliedPromo) => (
              <div key={apliedPromo.promo}>
                {apliedPromo.title} - {apliedPromo.discount}% -
                <button
                  className={styles['remove-promo']}
                  onClick={() => removePromoHandler(apliedPromo)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          className={styles['input-promocode']}
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
          placeholder="Enter promocode"
        />
        {ALL_PROMOCODES.map((promo) => {
          if (promo.promo === promocode) {
            return (
              <div key={promo.promo}>
                <div>
                  {promo.title} - {promo.discount}%
                  {!appliedPromocodes.find(
                    (apPromo) => apPromo.title === promo.title
                  ) && (
                    <button
                      className={styles['add-promo']}
                      onClick={() => addPromoHandler(promo)}
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default CartPromocode;
