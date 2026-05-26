import { useState } from 'react';
import styles from './AuthPage.module.scss';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className={styles.subtitle}>
          {isLogin
            ? 'Sign in to explore the mall'
            : 'Join the virtual shopping experience'}
        </p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="your@email.com"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className={styles.switch}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className={styles.switchBtn}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
