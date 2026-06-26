import React, { useState, useEffect } from 'react';

const API_BASE = '';

// Iconos SVG Premium para cada lenguaje de programación
const PythonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.95 2C6.46 2 6.57 4.38 6.57 4.38L6.58 6.84H12V7.61H4.21C4.21 7.61 2 9.54 2 15c0 5.46 3.93 5.09 3.93 5.09h2.32V17.7S8.1 14.88 12 14.88c3.9 0 5.86 2.82 5.86 2.82v2.39h2.21s3.93.37 3.93-5.09c0-5.46-2.21-7.39-2.21-7.39h-3.41V6.84h1.09s5.38.11 5.38-4.84c0-4.95-4.83-4.38-4.83-4.38H11.95zm-3.08 2.06a.88.88 0 0 1 .88-.88.88.88 0 0 1 .87.88.88.88 0 0 1-.87.87.88.88 0 0 1-.88-.87zM12 9.15v2.32H6.58v1.07H12v2.31h5.42V9.15H12zm3.1 10.79a.88.88 0 0 1 .88-.88c.49 0 .88.39.88.88a.88.88 0 0 1-.88.87.88.88 0 0 1-.88-.87z" fill="#3776ab" />
  </svg>
);

const JSIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#f7df1e" />
    <path d="M18.5 18c-.8.8-2 1-3 .5s-1.5-1.5-1.5-2.5h2c0 .5.3.8.7.9.4.1.8 0 1-.3.3-.3.3-.8 0-1.1-.3-.3-1.1-.7-1.7-1.1s-1.3-1-1.3-2c0-.8.4-1.6 1.1-2 .7-.4 1.7-.5 2.5-.2.8.3 1.3 1 1.4 1.8h-2c0-.4-.2-.7-.5-.8-.3-.1-.7 0-.9.2-.2.2-.2.5 0 .7.2.2.9.5 1.5.9s1.5 1 1.5 2.1c0 1-.4 1.8-1.1 2.3zm-7.3-3.8c0 1.2-.5 2.2-1.3 2.8-.8.6-2 .8-3 .5-.8-.3-1.4-1-1.6-1.8h2c.1.4.3.6.6.7s.7 0 .9-.2c.2-.2.3-.6.3-1v-5.7h2v5.7z" fill="#000000" />
  </svg>
);

const JavaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18c0 2 3.5 3 6.5 3s6.5-1 6.5-3-3.5-3-6.5-3-6.5 1-6.5 3z" fill="#5382a1" opacity="0.3" />
    <path d="M10.2 16.2c.4.1.8.2 1.2.2 2.5 0 4.2-1.2 5.5-2.8 1-1.2 1.8-2.6 1.8-4.2 0-3-2.1-4.4-4.8-4.4-.7 0-1.3.1-1.9.2-.5.1-1 .2-1.5.4-.5.2-.8.5-1 .9s-.2 1 0 1.5c.3.7 1.1 1.2 2 1.4 1.5.3 3.1.2 4.4-.6.2-.1.4 0 .4.2 0 .5-.4 1.1-.9 1.6-1.1 1.1-2.6 1.8-4.1 2-.6.1-1.2 0-1.8-.2-.8-.2-1.6-.6-2-.9-.3-.2-.7-.1-.9.2-.2.3-.3.7-.1 1 .5.8 1.4 1.4 2.3 1.7.5.2 1 .3 1.5.3zm-6 2.3c0 .8 1.5 1.5 3.5 1.8 1.4.2 2.8.2 4.2.1 3-.2 5.8-1.2 5.8-2.4 0-.3-.3-.6-.8-.8-.4-.2-.9-.3-1.5-.4-.3-.1-.5 0-.6.3-.1.3 0 .6.3.7.4.1.8.2 1.1.3.4.1.5.3.5.4 0 .5-2 1.2-4.5 1.4-1.2.1-2.4.1-3.6 0-1.8-.2-3-.7-3-1.1 0-.3.4-.6 1.2-.8.3-.1.4-.4.3-.7-.1-.3-.4-.4-.7-.3-1.1.3-1.7.7-1.7 1.2z" fill="#ea2d2e" />
    <path d="M12.5 1.5c.3.6.5 1.3.5 2 0 1.2-.7 2.2-1.5 3.1-.2.2-.2.5 0 .7.3.3.7.3 1 .1 1.2-1.1 2-2.7 2-4.4 0-1-.3-1.9-.8-2.7-.2-.3-.6-.4-.8-.1-.2.2-.2.7.1 1.3z" fill="#f89820" />
  </svg>
);

const getIcon = (nombre) => {
  switch (nombre.toLowerCase()) {
    case 'python': return <PythonIcon />;
    case 'javascript': return <JSIcon />;
    case 'java': return <JavaIcon />;
    default: return null;
  }
};

const getDesc = (nombre) => {
  switch (nombre.toLowerCase()) {
    case 'python': return 'Lenguaje interpretado de alto nivel y multipropósito, ideal para ciencia de datos e IA.';
    case 'javascript': return 'El motor de la web moderna. Flexible, dinámico y esencial para el desarrollo web interactivo.';
    case 'java': return 'Robusto, tipado y orientado a objetos. Diseñado para tener las menores dependencias de implementación.';
    default: return 'Curso de desarrollo y programación especializada.';
  }
};

function App() {
  // ==========================================
  // 1. ESTADO DE LA APLICACIÓN (STATE)
  // React guarda aquí las variables que, al cambiar, actualizan la pantalla
  // ==========================================
  const [products, setProducts] = useState([]); // Lista de cursos
  const [cart, setCart] = useState({});         // Qué hay en el carrito y cuánto
  const [total, setTotal] = useState(0.0);      // Total a pagar
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); // Para mostrar el cartel verde de éxito
  const [loading, setLoading] = useState(true); // Para mostrar "Cargando..."
  const [error, setError] = useState(null);     // Para mostrar si hubo error de conexión

  // ==========================================
  // 2. CARGA INICIAL DE DATOS (Cuando entras por primera vez)
  // ==========================================
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        // Hacemos 3 llamadas a la API (backend) al mismo tiempo
        const [prodRes, cartRes, totalRes] = await Promise.all([
          fetch(`${API_BASE}/`),
          fetch(`${API_BASE}/carrito`),
          fetch(`${API_BASE}/total`)
        ]);

        if (!prodRes.ok || !cartRes.ok || !totalRes.ok) {
          throw new Error('Error al conectar con la API del servidor backend.');
        }

        // Convertimos las respuestas a JSON (texto entendible para Javascript)
        const prodData = await prodRes.json();
        const cartData = await cartRes.json();
        const totalData = await totalRes.json();

        // Guardamos los datos en los "Estados" de React definidos arriba
        setProducts(prodData);
        setCart(cartData);
        setTotal(totalData.total);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ya terminó de cargar, ocultamos el mensaje
      }
    };

    loadInitialData(); // Ejecutamos la función de arriba
  }, []);

  // ==========================================
  // 3. FUNCIONES DE INTERACCIÓN DEL USUARIO
  // ==========================================

  // Función que se dispara al hacer click en "+ Agregar"
  const handleAddToCart = async (id) => {
    try {
      // Le manda la orden al backend (app.js) para que guarde en la BD
      const res = await fetch(`${API_BASE}/agregar/${id}`, { method: 'POST' });
      if (!res.ok) throw new Error('Error al agregar el producto.');
      
      // El backend nos devuelve el carrito actualizado, lo guardamos en pantalla
      const updatedCart = await res.json();
      setCart(updatedCart);

      // Actualizar también el número total en dinero
      const totalRes = await fetch(`${API_BASE}/total`);
      const totalData = await totalRes.json();
      setTotal(totalData.total);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/eliminar/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al remover el producto.');
      const updatedCart = await res.json();
      setCart(updatedCart);

      // Actualizar total
      const totalRes = await fetch(`${API_BASE}/total`);
      const totalData = await totalRes.json();
      setTotal(totalData.total);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/vaciar`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al vaciar el carrito.');
      const data = await res.json();
      setCart(data.carrito);
      setTotal(0.0);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE}/vaciar`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al procesar la compra.');
      const data = await res.json();
      setCart(data.carrito);
      setTotal(0.0);
      setCheckoutSuccess(true);
    } catch (err) {
      alert(err.message);
    }
  };

  // Calcula cuántos ítems totales hay sumando las cantidades
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // ==========================================
  // 4. LO QUE SE DIBUJA EN LA PANTALLA (HTML / JSX)
  // ==========================================
  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <a href="#" className="logo">
            A Academy
          </a>
          <div className="header-summary">
            <div className="cart-indicator" id="header-cart-indicator">
              🛒 Carrito: <span id="header-cart-count">{totalItems}</span> items
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="app-main" style={{ display: 'block', textAlign: 'center', padding: '4rem 1rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-danger)', padding: '2rem', borderRadius: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ color: 'var(--accent-danger)', marginBottom: '1rem' }}>¡Ups! Hubo un problema de conexión</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
            <button className="btn-add" style={{ margin: '1.5rem auto 0' }} onClick={() => window.location.reload()}>Reintentar Conexión</button>
          </div>
        </div>
      ) : loading ? (
        <div className="app-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>Cargando tienda...</div>
        </div>
      ) : (
        <main className="app-main">
          {/* Listado de Productos */}
          <section className="products-section">
            <h2>📦 Cursos Disponibles</h2>
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id} id={`product-card-${product.id}`}>
                  <div>
                    <div className="product-icon-wrapper">
                      {getIcon(product.nombre)}
                    </div>
                    <h3 className="product-name">{product.nombre}</h3>
                    <p className="product-desc">{getDesc(product.nombre)}</p>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">${product.precio.toFixed(2)}</span>
                    <button 
                      className="btn-add" 
                      id={`btn-add-${product.id}`}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <span>+</span> Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Panel Lateral del Carrito */}
          <aside className="cart-section">
            <h2>🛒 Resumen de Compra</h2>
            <div className="cart-panel">
              {totalItems === 0 ? (
                <div className="cart-empty" id="cart-empty-state">
                  <div className="cart-empty-icon">🛍️</div>
                  <p>Tu carrito está vacío</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Agrega algún curso para comenzar.</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-list" id="cart-items-container">
                    {Object.entries(cart).map(([productId, quantity]) => {
                      const product = products.find((p) => p.id === parseInt(productId, 10));
                      if (!product) return null;
                      return (
                        <div className="cart-item" key={productId} id={`cart-item-${productId}`}>
                          <div className="cart-item-info">
                            <div className="cart-item-name">{product.nombre}</div>
                            <div className="cart-item-price">${product.precio.toFixed(2)} / c.u.</div>
                          </div>
                          <div className="cart-item-actions">
                            <button 
                              className="btn-qty btn-minus" 
                              id={`btn-minus-${productId}`}
                              onClick={() => handleRemoveFromCart(product.id)}
                            >
                              -
                            </button>
                            <span className="cart-item-qty" id={`qty-${productId}`}>{quantity}</span>
                            <button 
                              className="btn-qty btn-plus" 
                              id={`btn-plus-${productId}`}
                              onClick={() => handleAddToCart(product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span id="cart-subtotal">${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Impuestos (0%)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span id="cart-total">${total.toFixed(2)}</span>
                    </div>

                    <div className="cart-buttons">
                      <button 
                        className="btn-clear" 
                        id="btn-clear-cart"
                        onClick={handleClearCart}
                      >
                        Vaciar
                      </button>
                      <button 
                        className="btn-checkout" 
                        id="btn-checkout"
                        onClick={handleCheckout}
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>
        </main>
      )}

      <footer className="app-footer">
        <p>© 2026 Academy. Todos los derechos reservados. Desarrollado con ExpressJS, SQLite y React SPA.</p>
      </footer>

      {/* Modal de éxito de compra */}
      {checkoutSuccess && (
        <div className="modal-overlay" id="checkout-modal">
          <div className="modal-content">
            <div className="modal-success-icon">✓</div>
            <h2 className="modal-title">¡Compra Exitosa!</h2>
            <p className="modal-text">
              Tu pedido ha sido procesado correctamente. Gracias por comprar en Academy.
            </p>
            <button 
              className="btn-modal-close" 
              id="btn-close-modal"
              onClick={() => setCheckoutSuccess(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
