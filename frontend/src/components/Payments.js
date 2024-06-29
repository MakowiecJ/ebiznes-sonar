import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Payments.css';

const Payments = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        fetchPurchaseHistory();
    }, []);

    const fetchPurchaseHistory = () => {
        axios.get('http://localhost:8080/payments')
            .then(response => {
                setPurchaseHistory(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the purchase history!', error);
            });
    };

    return (
        <div className="purchase-history-container">
            <h1>Purchase History</h1>
            {purchaseHistory.length > 0 ? (
                <div className="purchase-cards">
                    {purchaseHistory.map((purchase, index) => (
                        <div key={index} className="purchase-card">
                            <div className="purchase-info">
                                <p className="purchase-date">Date: {new Date(purchase.PaidAt).toLocaleDateString()}</p>
                                <p className="purchase-total">Total: ${purchase.TotalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-purchase">No purchase history.</p>
            )}
        </div>
    );
};

export default Payments;