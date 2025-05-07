import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ShoppingCart from './components/ShoppingCart';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [cart, setCart] = useState([]);

    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        if (item.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== productId));
        }
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const renderPage = () => {
        switch (currentPage) {
            case 'products':
                return (
                    <ProductsPage
                        cart={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                );
            case 'profile':
                return <ProfilePage />;
            case 'cart':
                return (
                    <CartPage
                        cart={cart}
                        onRemove={removeFromCart}
                        totalPrice={totalPrice}
                    />
                );
            case 'home':
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };

        const showCart = currentPage === 'products' || cart.length > 0;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Header
                currentPage={currentPage}
                onNavigate={handleNavigate}
                cartCount={totalItems}
            />
            <main>
                {renderPage()}
                {currentPage !== 'cart' && showCart && (
                    <ShoppingCart
                        cartItems={cart}
                        onRemove={removeFromCart}
                        totalPrice={totalPrice}
                    />
                )}
            </main>
            <footer style={{
                marginTop: '50px',
                padding: '20px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                color: '#666'
            }}>
                <p>React Multi-Page Application</p>
            </footer>
        </div>
    );
}

export default App;
