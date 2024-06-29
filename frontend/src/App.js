import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Carts from './components/Carts';
import Payments from './components/Payments';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import NotFound from './components/NotFound';


function App() {
    return (
        <Router>
            <CartProvider>
                <div className="App">
                  <Header />
                    <Routes>
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Carts />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/" exact element={<Products />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
