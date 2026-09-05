import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Happy Fashion',
};

export default function PrivacyPage() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container-hf">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-earth)', marginBottom: '32px' }}>
          Privacy Policy
        </h1>

        <div style={{ display: 'grid', gap: '32px' }}>
          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Information We Collect
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>When you place an order, we collect:</p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Your name and contact details (phone, email)</li>
                <li>Shipping address</li>
                <li>Order details and payment method</li>
              </ul>
              <p>We do not store credit/debit card details — payments are processed securely by Razorpay.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              How We Use Your Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>To process and ship your orders</li>
                <li>To communicate order updates via WhatsApp</li>
                <li>To improve our products and customer experience</li>
                <li>To send occasional updates about new products (only if you subscribe)</li>
              </ul>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Data Protection
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>We do not sell, trade, or share your personal information with third parties.</p>
              <p>Your data is used solely for order processing and customer communication.</p>
              <p>We retain order records for accounting and legal purposes.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Cookies
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>We use cookies to maintain your cart session and improve site functionality.</p>
              <p>You can disable cookies in your browser settings, but some features may not work properly.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Contact
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>For privacy-related concerns, reach us on WhatsApp: <strong style={{ color: 'var(--color-earth)' }}>+91 81782 21808</strong></p>
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
