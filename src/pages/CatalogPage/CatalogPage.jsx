import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import styles from './CatalogPage.module.scss';

const MOCK_PRODUCTS = [
  { id: 'p1', name: 'Wireless Headphones', price: 99.99, store: 'Tech World', category: 'electronics', image: null },
  { id: 'p2', name: 'Gaming Mouse', price: 59.99, store: 'Tech World', category: 'electronics', image: null },
  { id: 'p3', name: 'Mechanical Keyboard', price: 129.99, store: 'Tech World', category: 'electronics', image: null },
  { id: 'p4', name: 'Designer T-Shirt', price: 39.99, store: 'Fashion Hub', category: 'clothing', image: null },
  { id: 'p5', name: 'Sneakers Pro', price: 119.99, store: 'Fashion Hub', category: 'clothing', image: null },
  { id: 'p6', name: 'Leather Jacket', price: 199.99, store: 'Fashion Hub', category: 'clothing', image: null },
];

const categories = ['all', 'electronics', 'clothing'];

function CatalogPage() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Catalog</h1>
          <p className={styles.subtitle}>Discover products from all stores</p>
        </header>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <span className={styles.productPlaceholder}>
                  {product.name.charAt(0)}
                </span>
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productStore}>{product.store}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className={styles.productActions}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className={styles.empty}>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;
