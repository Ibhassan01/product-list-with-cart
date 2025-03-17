import { useState } from 'react';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import data from '../data.json';
import './App.css';

function App() {
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (item, quantity) => {
        const existingItem = cart.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            // Update quantity if item already exists in cart
            setCart(
                cart.map((cartItem) =>
                    cartItem.name === item.name
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                )
            );
        } else {
            // Add new item to cart
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const removeFromCart = (itemName) => {
        setCart(cart.filter((cartItem) => cartItem.name !== itemName));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleConfirmOrder = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStartNewOrder = () => {
        setCart([]); // Clear the cart
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className='body'>
            <div className='container'>
            <Header />
            <div className="item-list">
                {data.map((item, index) => (
                    <ItemCard
                        key={index}
                        src={item.image.mobile}
                        category={item.category}
                        name={item.name}
                        price={item.price}
                        addToCart={addToCart}
                    />
                ))}
            </div>
            </div>
            <div className="cart-section">
                {cart.length === 0 ? (
                    <div className='empty_cart'>
                    <h2>Your Cart (0)</h2>
                    <img
                    className='empty_image'
                      src='./images/illustration-empty-cart.svg'
                      alt='empty cart image'
                    />
                    <p>Your added items will appear here</p>
                  </div>
                ) : (
                    <>
                        <h2>Your Cart ({cart.length})</h2>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.name}</span>
                                <span>{item.quantity}x</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button className='remove' onClick={() => removeFromCart(item.name)}>
                                  <img src="./images/icon-remove-item.svg" alt="remov-icon" />
                                </button>
                            </div>
                        ))}
                        <div className="cart-total">
                            <span>Order Total</span>
                            <span>${calculateTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="carbon_neutral">
                          <img 
                            src="./images/icon-carbon-neutral.svg" 
                            alt="carbob neutral" 
                          />
                          <p>This is a <span>carbon-neutral</span> delivery</p>
                        </div>
                        <button className="cart_confirm-button" onClick={handleConfirmOrder}>
                            Confirm Order
                        </button>
                    </>
                )}
            </div>
            {isModalOpen && (
                <OrderConfirmationModal
                    cart={cart}
                    totalPrice={calculateTotalPrice()}
                    onClose={handleCloseModal}
                    onStartNewOrder={handleStartNewOrder}
                />
            )}
        </div>
    );
}

export default App;