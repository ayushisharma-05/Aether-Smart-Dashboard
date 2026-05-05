import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { CreditCard, ShieldCheck, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { t } = useTranslation();
  const { cartItems, totalCost, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (clearCart) clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center', borderRadius: '20px' }}>
          <ShieldCheck size={64} className="gold-accent" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Payment Successful</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Thank you for your purchase. Your luxury items will be shipped soon.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', padding: '120px 5% 100px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Payment Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px' }}>
          <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <CreditCard /> Secure Checkout
          </h2>
          <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Cardholder Name</label>
              <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Card Number</label>
              <input type="text" required placeholder="4000 1234 5678 9010" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Expiry Date</label>
                <input type="text" required placeholder="MM/YY" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>CVV</label>
                <input type="password" required placeholder="123" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <button type="submit" disabled={isProcessing} className="btn-primary" style={{ marginTop: '1rem', padding: '15px', fontSize: '1.1rem' }}>
              {isProcessing ? 'Processing...' : `Pay $${totalCost}`}
            </button>
          </form>
        </motion.div>

        {/* Order Summary & Barcode */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '2rem' }}>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                  <span>{item.quantity}x {item.type}</span>
                  <span className="gold-accent">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span className="gold-accent">${totalCost}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
            <QrCode size={48} className="gold-accent" style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Scan to pay with crypto or mobile wallet</p>
            {/* Fake Barcode */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', height: '60px' }}>
              {[...Array(20)].map((_, i) => (
                <div key={i} style={{ width: Math.random() > 0.5 ? '4px' : '2px', background: 'var(--text-primary)', height: '100%' }} />
              ))}
            </div>
            <p style={{ fontSize: '0.8rem', letterSpacing: '3px', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>AETHER-PAY-84291</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;
