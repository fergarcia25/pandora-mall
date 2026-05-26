import styles from './Spinner.module.scss';

function Spinner({ size = 'md', className = '', ...props }) {
  const classes = [
    styles.spinner,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper} role="status" {...props}>
      <div className={classes}>
        <div className={styles.ring} />
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
