import React, { useState, useEffect } from 'react';
import { Palette, ShieldCheck, Package, Truck, ShoppingCart } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Shop({ setActivePage, triggerToast, cart, addToCart, clearCart }) {
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Products');
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/shop`);
        const json = await res.json();
        if (json.success && json.data) {
          setDbProducts(json.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const activeProducts = dbProducts.map(p => ({
    id: p._id || p.id,
    category: p.category,
    medium: p.medium || (p.category === 'Paintings' ? 'Acrylic on Canvas' : 'Handmade Art Piece'),
    name: p.name,
    price: p.price,
    description: p.description,
    element: (
      <img src={p.image || '/logo.png'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    )
  }));

  const filteredProducts = activeProducts.filter(p => 
    activeTab === 'All Products' || 
    p.category === activeTab ||
    (activeTab === 'Handmade Art' && p.category === 'Pebble Art')
  );

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
      triggerToast('Please complete all shipping details');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutForm,
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          total: getCartTotal()
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setOrderSuccess({
          id: data.orderId,
          total: getCartTotal(),
          name: checkoutForm.name,
          phone: checkoutForm.phone,
          email: checkoutForm.email,
          address: checkoutForm.address,
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }))
        });
        clearCart();
        setCheckoutMode(false);
        triggerToast('Order request placed successfully!');
      } else {
        triggerToast(data.message || 'Failed to place order request');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error, could not submit order request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div>
        <div className="page-hero">
          <div className="container page-hero-content">
            <h1 className="display-hero">Order Requested!</h1>
            <p>Thank you for supporting MasterBrush Art Foundation.</p>
          </div>
        </div>
        
        <section className="section">
          <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '12px' }}>
              Your Order Request has been Submitted!
            </h2>
            <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>
              Your Order ID is <strong>{orderSuccess.id}</strong>. We have received your order request and our administrator will contact you shortly.
            </p>
            
            <div style={{ background: 'white', border: '1px solid var(--border-soft)', padding: '28px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '32px', boxShadow: 'var(--shadow-soft)' }}>
              <h3 style={{ fontSize: '1.15rem', borderBottom: '1.5px solid var(--border-soft)', paddingBottom: '12px', marginBottom: '16px', color: 'var(--navy)' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px' }}>
                {orderSuccess.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      <strong>{item.name}</strong> <span style={{ color: 'var(--text-light)' }}>x{item.quantity}</span>
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1.5px solid var(--border-soft)', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--navy)', fontSize: '1rem' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--saffron)' }}>₹{orderSuccess.total.toLocaleString()}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.15rem', borderBottom: '1.5px solid var(--border-soft)', paddingBottom: '12px', marginBottom: '16px', color: 'var(--navy)' }}>Shipping Information</h3>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', lineHeight: '1.5' }}>
                <p><strong>Full Name:</strong> {orderSuccess.name}</p>
                <p><strong>Email Address:</strong> {orderSuccess.email}</p>
                <p><strong>Mobile Number:</strong> {orderSuccess.phone}</p>
                <p><strong>Delivery Address:</strong> {orderSuccess.address}</p>
              </div>

              <h3 style={{ fontSize: '1.15rem', borderBottom: '1.5px solid var(--border-soft)', paddingBottom: '12px', marginBottom: '16px', color: 'var(--navy)' }}>How Ordering Works next</h3>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.5' }}>
                <p>1. Our administrator will contact you on your registered mobile number: <strong>{orderSuccess.phone}</strong>.</p>
                <p>2. The admin will verify your details, confirm the order, and explain the manual payment process (UPI, Bank Transfer, Cash on Delivery, etc.).</p>
                <p>3. Once payment is confirmed, your package will be packed and shipped to your delivery address.</p>
              </div>
            </div>

            <a className="btn btn-primary" onClick={() => setOrderSuccess(null)}>Continue Shopping</a>
          </div>
        </section>
      </div>
    );
  }

  if (checkoutMode) {
    return (
      <div>
        <div className="page-hero">
          <div className="container page-hero-content">
            <h1 className="display-hero">Checkout</h1>
            <p>Review your purchase items and complete your order.</p>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="checkout-grid">
              {/* Shipping info */}
              <div className="contact-form" style={{ padding: '32px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: '20px' }}>Shipping Details</h3>
                
                <form onSubmit={handlePlaceOrder}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={checkoutForm.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter your name" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={checkoutForm.email} 
                      onChange={handleInputChange} 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={checkoutForm.phone} 
                      onChange={handleInputChange} 
                      placeholder="Enter your mobile number" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea 
                      name="address" 
                      value={checkoutForm.address} 
                      onChange={handleInputChange} 
                      placeholder="House No, Apartment Name, Street, Landmark, City, Pincode" 
                      style={{ minHeight: '80px' }}
                      required 
                    ></textarea>
                  </div>

                  {/* How Ordering Works Box */}
                  <div style={{ background: 'var(--cream-warm)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-sm)', padding: '20px', marginTop: '24px', marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>How Ordering Works</h4>
                    <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                      <li>Fill in your shipping details.</li>
                      <li>Submit your order request.</li>
                      <li>Our administrator will contact you on your registered mobile number.</li>
                      <li>The admin will confirm your order and explain the payment process.</li>
                      <li>Once payment is confirmed, your package will be packed and shipped to your delivery address.</li>
                    </ol>
                  </div>

                  {/* Warning Note Box */}
                  <div style={{ background: 'var(--saffron-pale)', borderLeft: '4px solid var(--saffron)', borderRadius: 'var(--radius-sm)', padding: '16px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--saffron)', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>
                      <strong>Note:</strong> We do not accept online payments through the website. After submitting your order request, our team will contact you on your registered mobile number to confirm your order, discuss payment, and arrange shipping. Please ensure your mobile number is correct and reachable.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button 
                      type="button" 
                      className="btn btn-outline" 
                      style={{ flex: 1 }}
                      onClick={() => setCheckoutMode(false)}
                    >
                      Back to Cart
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ flex: 1, justifyContent: 'center' }}
                      disabled={submitting}
                    >
                      {submitting ? 'Requesting Order...' : 'Request Order'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order summary */}
              <div style={{ background: 'white', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: '32px', height: 'fit-content' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', borderBottom: '1px solid var(--border-soft)', paddingBottom: '12px', marginBottom: '20px' }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <div>
                        <strong>{item.name}</strong> <span style={{ color: 'var(--text-light)' }}>x{item.quantity}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{item.medium}</div>
                      </div>
                      <div style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                  
                  <div style={{ borderTop: '1.5px solid var(--border-soft)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--saffron)' }}>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Shop</span></div>
          <h1 className="display-hero">Shop</h1>
          <p>Art You Love, Made with Passion — original artworks available to own.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-tabs mb-8">
            {['All Products', 'Paintings', 'Pebble Art', 'Handmade Art', 'Custom Orders'].map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="shop-grid">
            {loading ? (
              <p style={{ textAlign: 'center', padding: '48px', width: '100%', gridColumn: '1 / -1', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading shop catalog...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '48px', width: '100%', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No products found in this category. Add new catalog items via the Admin dashboard.</p>
            ) : filteredProducts.map(p => (
              <div key={p.id} className="shop-card">
                <div className="shop-thumb">
                  {p.element}
                </div>
                <div className="shop-body">
                  <div className="shop-medium">{p.medium}</div>
                  <div className="shop-name">{p.name}</div>
                  <div className="shop-price">₹{p.price.toLocaleString()}</div>
                  <a 
                    className="btn btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    onClick={() => {
                      addToCart(p);
                      triggerToast(`${p.name} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
            
            {/* Custom orders card */}
            <div className="shop-card">
              <div className="shop-thumb" style={{ backgroundColor: 'var(--cream-warm)' }}>
                <div style={{ textAlign: 'center', padding: '30px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}><Palette size={48} style={{ color: 'var(--saffron)' }} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>Custom Orders Welcome</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Commission your own artwork</div>
                </div>
              </div>
              <div className="shop-body">
                <div className="shop-medium">Any Medium · Any Size</div>
                <div className="shop-name">Custom Artwork</div>
                <div className="shop-price">Price on Request</div>
                <a 
                  className="btn btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                  onClick={() => setActivePage('contact')}
                >
                  Inquire Now
                </a>
              </div>
            </div>
          </div>

          {/* Secure strip */}
          <div className="secure-highlights-grid" style={{ marginTop: '48px', padding: '32px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}><ShieldCheck size={32} style={{ color: 'var(--green)' }} /></div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '4px' }}>Secure Payments</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>All transactions protected</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}><Package size={32} style={{ color: 'var(--saffron)' }} /></div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '4px' }}>Quality Packaging</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Artworks packed with care</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}><Truck size={32} style={{ color: 'var(--purple)' }} /></div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '4px' }}>Worldwide Shipping</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Delivered to your door</div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-out cart panel in footer when items are in cart (shows checkout directly) */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--navy)', color: 'white', padding: '16px 24px', zIndex: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ShoppingCart size={20} />
            <div>
              <strong style={{ fontSize: '1rem' }}>{cart.reduce((qty, i) => qty + i.quantity, 0)} items in Cart</strong>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Total: ₹{getCartTotal().toLocaleString()}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white', padding: '8px 20px', fontSize: '0.82rem' }} onClick={clearCart}>
              Clear
            </button>
            <button className="btn btn-accent" style={{ padding: '8px 24px', fontSize: '0.82rem' }} onClick={() => {
              setCheckoutMode(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Checkout Now →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
