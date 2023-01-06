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
      {appliedPromocodes.length && (
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
        {appliedPromocodes &&
          appliedPromocodes.map((apliedPromo) => (
            <div key={apliedPromo.promo}>
              {apliedPromo.title}
              <button onClick={() => removePromoHandler(apliedPromo)}>X</button>
            </div>
          ))}
        <input
          type="text"
          value={promocode}
          onChange={(e) => setPromocode(e.target.value)}
        />
        {ALL_PROMOCODES.map((promo) => {
          if (promo.promo === promocode) {
            return (
              <div key={promo.promo}>
                <div>{promo.title}</div>
                <div>{promo.discount}</div>
                <div>{promo.promo}</div>
                {!appliedPromocodes.find(
                  (apPromo) => apPromo.title === promo.title
                ) && (
                  <button onClick={() => addPromoHandler(promo)}>ADD</button>
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default CartPromocode;
