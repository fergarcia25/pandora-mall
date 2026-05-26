import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button/Button';
import styles from './CartPage.module.scss';

function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <h1 className={styles.title}>Your Cart is Empty</h1>
            <p className={styles.subtitle}>
              Browse the catalog and add some items to get started.
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/catalog'}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <span className={styles.count}>{items.length} items</span>
        </div>

        <div className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <span className={styles.itemPlaceholder}>{item.name.charAt(0)}</span>
                </div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.itemStore}>{item.store}</span>
                  <span className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantityGroup}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      disabled={item.quantity <= 1}
                    >
                      &minus;
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button variant="primary" className={styles.checkoutBtn} disabled>
              Proceed to Checkout
            </Button>
            <Button
              variant="ghost"
              className={styles.clearBtn}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
