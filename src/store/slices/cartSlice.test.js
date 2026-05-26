import reducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
} from './cartSlice';

describe('cartSlice', () => {
  const initialState = {
    items: [],
    isOpen: false,
  };

  const product = { id: 'p1', name: 'Test Product', price: 10, store: 'Test Store' };

  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('adds item to cart', () => {
    const state = reducer(initialState, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('increments quantity when adding existing item', () => {
    const withItem = reducer(initialState, addToCart(product));
    const state = reducer(withItem, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes item from cart', () => {
    const withItem = reducer(initialState, addToCart(product));
    const state = reducer(withItem, removeFromCart('p1'));
    expect(state.items).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const withItem = reducer(initialState, addToCart(product));
    const state = reducer(withItem, updateQuantity({ id: 'p1', quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
  });

  it('does not set quantity below 1', () => {
    const withItem = reducer(initialState, addToCart(product));
    const state = reducer(withItem, updateQuantity({ id: 'p1', quantity: 0 }));
    expect(state.items[0].quantity).toBe(1);
  });

  it('clears cart', () => {
    const withItem = reducer(initialState, addToCart(product));
    expect(reducer(withItem, clearCart()).items).toHaveLength(0);
  });

  it('toggles cart open state', () => {
    expect(reducer(initialState, toggleCart()).isOpen).toBe(true);
    expect(reducer({ ...initialState, isOpen: true }, toggleCart()).isOpen).toBe(false);
  });
});
