import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Pandora Mall</span>
          <span className={styles.tagline}>The future of virtual shopping</span>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
