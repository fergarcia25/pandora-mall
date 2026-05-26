import styles from './Button.module.scss';

const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  outline: 'btn-outline-primary',
  ghost: styles.ghost,
};

function Button({
  children,
  variant = 'primary',
  size,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const classes = [
    'btn',
    styles.button,
    variantMap[variant] || variantMap.primary,
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
