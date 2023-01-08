import styles from './Footer.module.scss';
import githubIcon from '../../assets/icons/github.svg';
import rssIcon from '../../assets/icons/rs-school.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>Online Store 2023</span>
      <a href="https://github.com/elquespera/">
        <img src={githubIcon} alt="elquespera's github" />
        <span>elquespera</span>
      </a>
      <a href="https://github.com/2pageniy/">
        <img src={githubIcon} alt="2pageniy's github" />
        <span>2pageniy</span>
      </a>
      <a href="https://rs.school/js/">
        <img src={rssIcon} alt="2pageniy's github" />
      </a>
    </footer>
  );
};

export default Footer;
