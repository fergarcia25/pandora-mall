import styles from './Card.module.scss';

function Card({ children, className = '', header, footer, hover = true, ...props }) {
  const classes = [
    styles.card,
    'card',
    hover && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

export default Card;
