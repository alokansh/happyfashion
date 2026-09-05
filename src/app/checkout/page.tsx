'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { inr, STORE_WHATSAPP, RAZORPAY_KEY_ID } from '@/lib/utils';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { loadRazorpayScript } from '@/lib/razorpay';

export default function CheckoutPage() {
  const { items, totalPrice, removeItem, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', pin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter valid 10-digit number';
    if (form.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.pin.trim()) errs.pin = 'PIN code is required';
    else if (!/^\d{6}$/.test(form.pin.trim())) errs.pin = 'Enter valid 6-digit PIN';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setOrderError(null);
    setLoading(true);

    const orderId = 'HF-' + Date.now().toString(36).toUpperCase();
    const checkoutAmount = totalPrice; // Full online payment
    const orderData = {
      order_id: orderId,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email || '',
      address: form.address,
      city: form.city,
      pin: form.pin,
      items: items.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
      subtotal: totalPrice,
      checkout_amount: checkoutAmount,
      currency: 'INR',
      mode: 'prepaid',
      status: 'pending',
      payment_status: 'pending',
    };

    try {
      // Save order to Supabase first
      const { error: orderError } = await supabase.from('orders').insert(orderData);

      if (orderError) {
        throw new Error('Failed to save order: ' + orderError.message);
      }

      // Load Razorpay and initiate payment
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        throw new Error('Failed to load Razorpay. Please try again or use WhatsApp ordering.');
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: checkoutAmount * 100, // Razorpay expects paise
        currency: 'INR',
        name: 'Happy Fashion',
        description: `Order ${orderId}`,
        order_id: '', // Optional — can generate server-side order, but we skip for static export
        handler: async function (response: any) {
          // Update order with payment details
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              razorpay_order_id: response.razorpay_order_id || '',
              razorpay_payment_id: response.razorpay_payment_id || '',
              status: 'confirmed',
            })
            .eq('order_id', orderId);

          // Send WhatsApp confirmation
          const summary = items.map(i => `${i.name} x${i.qty} \u2014 ${inr(i.price * i.qty)}`).join('\\n');
          const message = `Hi! New order on Happy Fashion:\n\nOrder ID: ${orderId}\nPayment: PAID via Razorpay (\u20b9${inr(checkoutAmount)})\n\n${summary}\n\nTotal: \u20b9${inr(checkoutAmount)}\n\nName: ${form.name}\nPhone: ${form.phone}\n${form.email ? `Email: ${form.email}\n` : ''}Address: ${form.address}, ${form.city} - ${form.pin}`;

          window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
          clearCart();
          setOrderPlaced(true);
        },
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email,
        },
        theme: {
          color: '#A45A49',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err: any) {
      setOrderError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="payment-state">
        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some bags to your cart first.</p>
          <Link href="/shop" className="btn btn-primary">Browse Bags</Link>
        </div>
      </div>
    );
  }

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container-hf">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-earth)', marginBottom: '32px' }}>
          Checkout
        </h1>

        {orderError && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            {orderError}
          </div>
        )}

        {orderPlaced ? (
          <div className="payment-state">
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
              <h2>Payment Successful!</h2>
              <p>Your order has been confirmed. We'll process and ship your bags shortly.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '12px' }}>
                A WhatsApp confirmation will open in a new tab with your order details.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                <Link href="/shop" className="btn btn-primary" onClick={clearCart}>Continue Shopping</Link>
                <button className="btn btn-outline" onClick={() => setOrderPlaced(false)}>Done</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handlePlaceOrder} className="admin-card">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-earth)', marginBottom: '20px' }}>
                Delivery Details
              </h3>

              <div className="checkout-form-grid">
                <div className="full-width">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                  {errors.name && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.name}</span>}
                </div>

                <div>
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit number"
                  />
                  {errors.phone && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.phone}</span>}
                </div>

                <div>
                  <label>Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                  {errors.email && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.email}</span>}
                </div>

                <div className="full-width">
                  <label>Full Address *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Flat no., Street, Locality"
                  />
                  {errors.address && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.address}</span>}
                </div>

                <div>
                  <label>City *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                  />
                  {errors.city && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.city}</span>}
                </div>

                <div>
                  <label>PIN Code *</label>
                  <input
                    type="text"
                    value={form.pin}
                    onChange={e => setForm({ ...form, pin: e.target.value })}
                    placeholder="6-digit PIN"
                    maxLength={6}
                  />
                  {errors.pin && <span style={{ fontSize: '0.75rem', color: '#E63946' }}>{errors.pin}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }} disabled={loading}>
                {loading ? 'Processing...' : `Pay \u20b9${inr(totalPrice)} via Razorpay`}
              </button>

              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <a
                  href={`https://wa.me/${STORE_WHATSAPP}?text=Hi! I want to order from Happy Fashion`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-block btn-sm"
                >
                  Need help? Chat on WhatsApp
                </a>
              </div>
            </form>
          </>
        )}

        {/* Order Summary (always visible when cart has items and not on success) */}
        {!orderPlaced && items.length > 0 && (
          <div className="admin-card" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-earth)', marginBottom: '20px' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 50, height: 50, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-earth)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-earth)' }}>
                    {inr(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>{inr(totalPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: '#2D6A4F', fontWeight: 600 }}>Free (above &#8377;999)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-earth)', borderTop: '1px dashed var(--border-medium)', paddingTop: '8px' }}>
                <span>Total</span>
                <span>{inr(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
