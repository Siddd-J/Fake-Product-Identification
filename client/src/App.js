import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3Service from './Web3Service';
import Header from './components/Header';
import Navbar from './components/Navbar';
import './App.css';

// Home
import Home from './pages/Home';

// Manufacturer pages
import Manufacturer from './pages/Manufacturer/Manufacturer';
import AddProduct from './pages/Manufacturer/AddProduct';
import AddSeller from './pages/Manufacturer/AddSeller';
import SellProduct from './pages/Manufacturer/SellProduct';
import QuerySeller from './pages/Manufacturer/QuerySellersList';

// Seller pages
import Seller from './pages/Seller/Seller';
import ProductForSale from './pages/Seller/ProductForSale';
import SellToCustomer from './pages/Seller/SellToCustomer';

// Consumer pages
import Consumer from './pages/Consumer/Consumer';
import VerifyProduct from './pages/Consumer/VerifyProduct';
import PurchaseHistory from './pages/Consumer/PurchaseHistory';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const { web3, accounts, assetTracker, production } = await Web3Service.init();
        setWeb3(web3);
        setAccounts(accounts);
        setContracts({ assetTracker, production });
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize Web3:', error);
        setError('Failed to connect to blockchain: ' + error.message);
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <div className="loading">Loading blockchain data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
            
            {/* Manufacturer Routes */}
            <Route path="/manufacturer" element={<Manufacturer />} />
            <Route path="/manufacturer/add-product" element={<AddProduct />} />
            <Route path="/manufacturer/add-seller" element={<AddSeller />} />
            <Route path="/manufacturer/sell-product" element={<SellProduct />} />
            <Route path="/manufacturer/query-seller" element={<QuerySeller />} />
            
            {/* Seller Routes */}
            <Route path="/seller" element={<Seller />} />
            <Route path="/seller/product-for-sale" element={<ProductForSale />} />
            <Route path="/seller/sell-product" element={<SellToCustomer />} />
            <Route path="/seller/query-seller" element={<QuerySeller />} />
            
            {/* Consumer Routes */}
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/consumer/verify-product" element={<VerifyProduct />} />
            <Route path="/consumer/purchase-history" element={<PurchaseHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
