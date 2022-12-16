import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Online Store</span>
    </header>
  );
};

export default Header;
