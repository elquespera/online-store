import React, { useEffect, useRef, useState } from 'react';
import {
  ORDER_INPUTS,
  REDIRECT_INTERVAL,
  CARD_TYPES,
} from '../../constants/orderModal';
import { inputIDs } from '../../types';
import OrderInput from '../OrderInput/OrderInput';
import styles from './OrderModal.module.scss';

interface OrderModalProps {
  isOpened: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const OrderModal = ({ isOpened, onCancel, onSuccess }: OrderModalProps) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectIn, setRedirectIn] = useState(0);
  const [inputs, setInputs] = useState(ORDER_INPUTS);
  const [cardFirstDigit, setCardFirstDigit] = useState('0');

  const redirectInRef = useRef(redirectIn);
  redirectInRef.current = redirectIn;

  useEffect(() => {
    isOpened ? modal.current?.showModal() : modal.current?.close();
  }, [isOpened]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAllInputs()) return;
    setRedirectIn(REDIRECT_INTERVAL);
    setIsRedirecting(true);

    const redirectInterval = setInterval(() => {
      if (redirectInRef.current <= 1) {
        clearInterval(redirectInterval);
        clearInputs();
        onSuccess();
        setIsRedirecting(false);
      } else {
        setRedirectIn((seconds) => seconds - 1);
      }
    }, 1000);
  };

  const closeDialog = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isRedirecting) {
      onCancel();
      clearInputs();
    }
  };

  const clickDialog = (e: React.MouseEvent) => {
    if (e.target === modal.current) closeDialog(e);
  };

  const generateInputs = (from: number, to?: number) => {
    return (
      <React.Fragment>
        {inputs
          .slice(from, to)
          .map(({ id, value, placeholder, hint, pattern, valid, number }) => (
            <OrderInput
              key={id}
              id={id}
              value={value}
              placeholder={placeholder}
              hint={hint}
              pattern={pattern}
              valid={valid}
              number={number}
              onChange={validateInput}
            />
          ))}
      </React.Fragment>
    );
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = '';
      input.valid = true;
    });
    setInputs(inputs);
  };

  const validateInput = (id: number, value: string, pattern: RegExp) => {
    if (!inputs[id]) return;
    setInputs((prev) => {
      const copyInputs = [...prev];
      const input = copyInputs[id];
      switch (id) {
        case inputIDs.cardNumber:
          const cardNumber = value.replace(/\s/g, '');
          if (cardNumber.length === 0) {
            input.value = '';
          }
          if (cardNumber.length > 0 && cardNumber.length <= 16) {
            const numbers = cardNumber.match(/.{1,4}/g);
            if (numbers?.every((number) => +number >= 0 && +number <= 9999)) {
              input.value = numbers.join(' ');
            }
          }
          setCardFirstDigit(input.value.slice(0, 1));
          break;
        case inputIDs.cardValid:
          const valid = value.replace('/', '');
          if (+valid >= 0 && +valid <= 9999) {
            let month = String(Math.max(1, Math.min(12, +valid.slice(0, 2))));
            month = month.padStart(2, '0');
            if (valid.length > 2) {
              value = month + '/' + valid.slice(2);
            }
            input.value = value;
          }
          break;
        case inputIDs.cardCVV:
          const cvv = +value;
          if (cvv >= 0 && cvv <= 999) {
            input.value = value;
          }
          break;
        default:
          input.value = value;
      }
      input.valid = pattern.test(input.value) === true;
      return copyInputs;
    });
  };

  const validateAllInputs = (): boolean => {
    inputs.forEach(({ id, value, pattern }) =>
      validateInput(id, value, pattern)
    );
    return inputs.every((input) => input.valid);
  };

  const cardPicClass =
    styles['card-pic'] + ' ' + styles[CARD_TYPES[cardFirstDigit]];

  return (
    <dialog
      className={styles.modal}
      ref={modal}
      onCancel={closeDialog}
      onClick={clickDialog}
    >
      {isRedirecting ? (
        <div className={styles.dialog}>
          Your order has been successfully submitted! You will be redirected to
          the main page in {redirectIn} seconds.
        </div>
      ) : (
        <div className={styles.dialog}>
          <form method="dialog" onSubmit={submitForm}>
            <div className={styles['personal-details']}>
              <h3>Personal details</h3>
              {generateInputs(inputIDs.name, inputIDs.cardNumber)}
            </div>
            <div className={styles['card-details']}>
              <h3>Credit card details</h3>
              <span className={cardPicClass}></span>
              {generateInputs(inputIDs.cardNumber)}
            </div>
            <button type="submit">Confirm order</button>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default OrderModal;
