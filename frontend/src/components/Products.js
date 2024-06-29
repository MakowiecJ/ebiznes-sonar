import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [lastAddedProduct, setLastAddedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:8080/products')
            .then(response => {
                setProducts(response.data);
                const initialQuantities = response.data.reduce((acc, product) => {
                    acc[product.ID] = 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        const quantity = quantities[product.ID];
        const url = `http://localhost:8080/carts/1/products?productId=${product.ID}&quantity=${quantity}`;
        axios.post(url)
            .then(response => {
                addToCart(product, quantity);
                setLastAddedProduct(product.Name);
            })
            .catch(error => {
                console.error('There was an error adding the product to the cart!', error);
            });
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity < 1) {
            quantity = 1;
        }
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity
        }));
    };

    return (
        <div className="products-container">
            <h1>Products</h1>
            {lastAddedProduct && <p className="notification">{lastAddedProduct} has been added to the cart!</p>}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.ID} className="product-card">
                        <div className="product-info">
                            <div className="product-name">{product.Name}</div>
                            <div className="product-price">${product.Price}</div>
                        </div>
                        <div className="product-actions">
                            <input type="number" className="quantity-input" min="1" value={quantities[product.ID] || 0} onChange={(e) => handleQuantityChange(product.ID, parseInt(e.target.value))} />
                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;