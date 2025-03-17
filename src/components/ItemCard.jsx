import { useState } from 'react';
import '../ItemCard.css';

const ItemCard = ({ src, category, name, price, addToCart }) => {
    const [showQuantityUI, setShowQuantityUI] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCartClick = () => {
        setShowQuantityUI(true);
    };

    const handleConfirmQuantity = () => {
        addToCart({ name, price, category, src }, quantity);
        setShowQuantityUI(false);
        setQuantity(1);
    };

    return (
        <div className="item_container">
            <img className="image" src={src} alt={name} />
            {showQuantityUI ? (
                <div className="quantityUI">
                    <div className='amount'>
                        <button className="quantity_button" onClick={handleDecrement}>
                            -
                        </button>
                        <span>{quantity}</span>
                        <button className="quantity_button" onClick={handleIncrement}>
                            +
                        </button>
                    </div>
                    <button className="confirm-button" onClick={handleConfirmQuantity}>
                        Confirm
                    </button>
                </div>
            ) : (
                <p className="add_to_cart" onClick={handleAddToCartClick}>
                    <img src="./images/icon-add-to-cart.svg" alt="add-to-cart-icon" />
                    Add to Cart
                </p>
            )}
            <section className="about">
                <p className="category">{category}</p>
                <p className="name">{name}</p>
                <p className="price">$ {price}</p>
            </section>
        </div>
    );
};

export default ItemCard;