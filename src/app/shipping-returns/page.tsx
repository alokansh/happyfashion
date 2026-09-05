import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Returns — Happy Fashion',
};

export default function ShippingReturnsPage() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container-hf">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-earth)', marginBottom: '32px' }}>
          Shipping & Returns
        </h1>

        <div style={{ display: 'grid', gap: '32px' }}>
          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Shipping Policy
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p><strong style={{ color: 'var(--color-earth)' }}>Free Shipping:</strong> On all orders above ₹999 across India.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Standard Delivery:</strong> 5-7 business days for most PIN codes in India.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Order Processing:</strong> Orders are shipped within 1-2 business days of placement.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>COD Available:</strong> Cash on Delivery is available across India. Pay ₹500 advance to confirm, balance on delivery.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Tracking:</strong> Once shipped, you will receive tracking details via WhatsApp.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Return & Exchange Policy
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p><strong style={{ color: 'var(--color-earth)' }}>14-Day Returns:</strong> You can return any product within 14 days of delivery if you are not satisfied.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Condition:</strong> Items must be unused, in original packaging with tags attached.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Process:</strong> Message us on WhatsApp with your order details. We will arrange a pickup.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Refund:</strong> Refund is processed within 5-7 business days after we receive the returned item.</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Exchange:</strong> If you want a different size/color, mention it in your return request (subject to availability).</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
                Note: Products damaged by misuse, water exposure, or unauthorized modifications are not eligible for return.
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
