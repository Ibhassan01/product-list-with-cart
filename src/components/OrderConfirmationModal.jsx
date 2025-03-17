import React from 'react';
import '../OrderConfirmationModal.css';

const OrderConfirmationModal = ({ cart, totalPrice, onStartNewOrder }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <img src="./images/icon-order-confirmed.svg" alt="order-confirmed-icon" />
                <h1>Order Confirmed</h1>
                <p>We hope you enjoy your food!</p>
                <div className="order-items">
                    {cart.map((item, index) => (
                        <div key={index} className="order-item">
                            <img src={item.src} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <span>{item.name}</span>
                                <span>{item.quantity}x  @${item.price.toFixed(2)}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <hr />
                        </div>
                    ))}
                    
                </div>
                <div className="order-total">
                    <span>Order Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="start-new-order-button" onClick={onStartNewOrder}>
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;