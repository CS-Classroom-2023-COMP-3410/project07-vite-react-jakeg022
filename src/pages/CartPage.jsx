import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cart, onRemove, totalPrice }) {
    return (
        <div>
            <h1>Your Cart</h1>
            <ShoppingCart cartItems={cart} onRemove={onRemove} totalPrice={totalPrice} />
        </div>
    );
}

export default CartPage;
