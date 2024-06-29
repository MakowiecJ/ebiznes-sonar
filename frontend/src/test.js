import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Products from './components/Products';
// import Cart from './components/Cart';
// import Payments from './components/Payments';
// import { CartProvider } from './context/CartContext';
// import Header from './components/Header';

import Produkty from './components/Produkty';
import Koszyk from './components/Koszyk';
import Platnosci from './components/Platnosci';

function App() {
    return (
        <Router>
            <CartProvider>
                <div className="App">
                  <Header />
                    <Routes>
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/payments" element={<Payments />} />
                    </Routes>
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
