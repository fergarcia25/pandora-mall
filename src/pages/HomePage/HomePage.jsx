import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <span className={styles.gradient}>Pandora Mall</span>
        </h1>
        <p className={styles.subtitle}>
          Step into the future of shopping. Explore a virtual world
          where you can walk through stores, discover products,
          and connect with others — all from your browser.
        </p>
        <div className={styles.actions}>
          <Link to="/mall" className="btn btn-primary btn-lg">
            Entrar al Shopping
          </Link>
          
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>3D</span>
            <span className={styles.featureText}>Virtual Space</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>Live</span>
            <span className={styles.featureText}>Real-time Interaction</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>Shop</span>
            <span className={styles.featureText}>In-World Stores</span>
          </div>
        </div>
      </div>
      <div className={styles.backgroundGlow} />
    </div>
  );
}

export default HomePage;
