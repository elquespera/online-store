import React, { useEffect, useRef, useState } from 'react';
import styles from './OrderModal.module.scss';

interface OrderModalProps {
  isOpened: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const REDIRECT_INTERVAL = 5;

const OrderModal = ({ isOpened, onCancel, onSuccess }: OrderModalProps) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectIn, setRedirectIn] = useState(0);
  const redirectInRef = useRef(redirectIn);
  redirectInRef.current = redirectIn;

  useEffect(() => {
    if (isOpened) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isOpened]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setRedirectIn(REDIRECT_INTERVAL);
    setIsRedirecting(true);

    const redirectInterval = setInterval(() => {
      if (redirectInRef.current <= 1) {
        clearInterval(redirectInterval);
        onSuccess();
        setIsRedirecting(false);
      } else {
        setRedirectIn((prev) => prev - 1);
      }
    }, 1000);
  };

  const closeDialog = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isRedirecting) {
      onCancel();
    }
  };

  const clickDialog = (e: React.MouseEvent) => {
    if (e.target === modal.current) closeDialog(e);
  };

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
          <h3>Personal details</h3>
          <form method="dialog" onSubmit={submitForm}>
            <button type="submit">Confirm order</button>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default OrderModal;
