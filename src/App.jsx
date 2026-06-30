import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Support from './pages/Support';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const triggerToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const changeQuantity = (productId, amount) => {
    if (amount <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: amount } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Render current active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'members':
        return <Members setActivePage={setActivePage} triggerToast={triggerToast} />;
      case 'gallery':
        return <Gallery setActivePage={setActivePage} />;
      case 'events':
        return <Events setActivePage={setActivePage} triggerToast={triggerToast} />;
      case 'shop':
        return (
          <Shop
            setActivePage={setActivePage}
            triggerToast={triggerToast}
            cart={cart}
            addToCart={addToCart}
            clearCart={clearCart}
          />
        );
      case 'support':
        return <Support setActivePage={setActivePage} triggerToast={triggerToast} />;
      case 'blog':
        return <Blog setActivePage={setActivePage} triggerToast={triggerToast} />;
      case 'contact':
        return <Contact setActivePage={setActivePage} triggerToast={triggerToast} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky Header Nav */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={getCartCount()}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1, paddingTop: '100px', paddingBottom: cart.length > 0 && activePage === 'shop' ? '80px' : '0' }}>
        {renderPage()}
      </main>

      {/* Footer Navigation */}
      <Footer setActivePage={setActivePage} />

      {/* Cart Sidebar Modal */}
      {cartOpen && (
        <div className="modal-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem' }}>Your Shopping Cart</h3>
              <button 
                className="lightbox-close" 
                onClick={() => setCartOpen(false)}
                style={{ position: 'relative', top: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', margin: 'auto 0', color: 'var(--text-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}><ShoppingCart size={48} style={{ color: 'var(--navy)', opacity: 0.4 }} /></div>
                  <p>Your cart is empty.</p>
                  <a 
                    className="btn btn-primary" 
                    style={{ fontSize: '0.82rem', marginTop: '16px', display: 'inline-flex' }}
                    onClick={() => {
                      setActivePage('shop');
                      setCartOpen(false);
                    }}
                  >
                    Browse Art Shop
                  </a>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-thumb">
                      {/* Scale down raw SVG */}
                      <div style={{ width: '40px', height: '40px', transform: 'scale(0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.element}
                      </div>
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                    </div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Total Amount:</span>
                  <span style={{ color: 'var(--saffron)' }}>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <button 
                  className="btn btn-accent" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setCartOpen(false);
                    setActivePage('shop');
                    // Automatically scroll to checkout in shop
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification Overlay */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
