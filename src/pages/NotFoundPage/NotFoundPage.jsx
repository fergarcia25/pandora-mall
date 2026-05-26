import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Lost in the Mall</h2>
      <p className={styles.subtitle}>
        This corner of Pandora Mall doesn't exist... yet.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
