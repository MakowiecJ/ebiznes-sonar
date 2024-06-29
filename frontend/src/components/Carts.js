import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../styles/Carts.css';

const Carts = () => {
    const { clearCart } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState({ Products: [], TotalPrice: 0 });
    const cartId = 1;
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        fetchCartDetails();
    }, [cartId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/carts/${cartId}`)
            .then(response => {
                setCartDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cart details!', error);
            });
    }, [cartId]);

    const handlePayment = () => {
        axios.post(`http://localhost:8080/carts/${cartId}/pay`)
            .then(response => {
                console.log('Payment successful!', response);
                setPaymentSuccess(true);
                clearCart();
                fetchCartDetails();
            })
            .catch(error => {
                console.error('There was an error processing the payment!', error);
            });
    };


    const fetchCartDetails = () => {
        axios.get(`http://localhost:8080/carts/${cartId}`)
            .then(response => {
                setCartDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cart details!', error);
            });
    };

    

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {paymentSuccess && <div className="payment-success">Payment was successful!</div>}
            <div className="cart-items">
                {cartDetails.Products.map((item, index) => (
                    <div key={index} className="cart-item">
                        <p className="product-name">{item.Product.Name}</p>
                        <p className="product-quantity">Quantity: {item.Quantity}</p>
                        <p className="product-price">Price: ${item.Product.Price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="total-price">Total to Pay: ${cartDetails.TotalPrice.toFixed(2)}</div>
            <button onClick={handlePayment} className="pay-now-button">Pay Now</button>
        </div>
    );
};

export default Carts;