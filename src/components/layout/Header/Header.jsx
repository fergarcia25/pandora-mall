import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';

const navLinks = [
  //{ path: '/', label: 'Home' },
  { path: '/mall', label: 'Virtual Mall' },
  //{ path: '/catalog', label: 'Catalog' },
  //{ path: '/cart', label: 'Cart' },
];

function Header() {
  const location = useLocation();
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>Pandora</span>
          <span className={styles.sublogo}>Mall</span>
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.link} ${
                  location.pathname === link.path ? styles.active : ''
                }`}
              >
                {link.label === 'Cart' && cartItemsCount > 0 && (
                  <span className={styles.badge}>{cartItemsCount}</span>
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <Link to="/profile" className={styles.avatarBtn}>
              <span className={styles.avatarIcon} />
            </Link>
          ) : (
            <Link to="/auth" className={`btn btn-primary btn-sm`}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
