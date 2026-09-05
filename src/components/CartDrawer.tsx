'use client';

import { useCart } from '@/contexts/CartContext';
import { inr, STORE_WHATSAPP } from '@/lib/utils';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    closeCart();
  };

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3>Your Cart</h3>
            <span className="drawer-count-tag">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </div>
          <button className="drawer-close-btn" onClick={closeCart}>&times;</button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-icon">🛍️</div>
              <p>Your cart is empty</p>
              <Link href="/shop" className="btn btn-primary btn-sm" onClick={closeCart}>Browse Bags</Link>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">{inr(item.price)}</div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{inr(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-shipping">Shipping</span>
                <span className="summary-shipping">Free</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{inr(totalPrice)}</span>
              </div>
            </div>
            <div className="drawer-checkout-options">
              <Link href="/checkout" className="btn btn-primary btn-block" onClick={handleCheckout}>
                Proceed to Checkout
              </Link>
              <a
                href={`https://wa.me/${STORE_WHATSAPP}?text=Hi! I want to order:\n${items.map(i => `• ${i.name} x${i.qty}`).join('\n')}\nTotal: ${inr(totalPrice)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-block"
              >
                Order via WhatsApp
              </a>
              <button className="btn btn-outline btn-block btn-sm" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
