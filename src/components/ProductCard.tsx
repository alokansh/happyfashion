'use client';

import { Product } from '@/types';
import { inr } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const tagClass = product.tags.includes('bestseller') ? 'tag-bestseller'
    : product.tags.includes('new') ? 'tag-new'
    : product.tags.includes('limited') ? 'tag-limited'
    : '';

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`} className="product-thumb-wrap">
        <img src={product.image} alt={product.name} />
        {product.tag_text && (
          <div className="product-tags">
            <span className={`tag-badge ${tagClass}`}>{product.tag_text}</span>
          </div>
        )}
      </Link>
      <div className="product-body">
        <div className="product-category-row">
          <span className="prod-cat">{product.category_label}</span>
          <span className="prod-color-dot" style={{ background: product.color }} title={product.color_name} />
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-desc-short">{product.description.slice(0, 70)}...</p>
        <div className="product-price-row">
          <span className="prod-price">{inr(product.price)}</span>
          <span className="prod-mrp">{inr(product.mrp)}</span>
          <span className="prod-discount">{product.discount}</span>
        </div>
        <div className="product-card-btns">
          <button className="btn btn-primary btn-sm" onClick={() => addItem(product)}>
            Add to Cart
          </button>
          <Link href={`/product/${product.id}`} className="btn btn-outline btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
