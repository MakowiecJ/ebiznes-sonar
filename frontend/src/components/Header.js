import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="navigation">
                <ul className="navigation-list">
                    <li className="navigation-item"><Link to="/products" className="navigation-link">Products</Link></li>
                    <li className="navigation-item"><Link to="/cart" className="navigation-link">Cart</Link></li>
                    <li className="navigation-item"><Link to="/payments" className="navigation-link">Payments</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;