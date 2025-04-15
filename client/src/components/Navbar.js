import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Define navigation items based on the current path
  const getNavItems = () => {
    if (path.includes('/manufacturer')) {
      return [
        { to: '/manufacturer', label: 'HOME' },
        { to: '/manufacturer/add-product', label: 'ADD PRODUCT' },
        { to: '/manufacturer/add-seller', label: 'ADD SELLER' },
        { to: '/manufacturer/sell-product', label: 'SELL PRODUCT TO SELLER' },
        { to: '/manufacturer/query-seller', label: 'QUERY SELLER' }
      ];
    } else if (path.includes('/seller')) {
      return [
        { to: '/seller', label: 'HOME' },
        { to: '/seller/product-for-sale', label: 'PRODUCT FOR SALE' },
        { to: '/seller/sell-product', label: 'SELL PRODUCT TO CUSTOMER' },
        { to: '/seller/query-seller', label: 'QUERY SELLER' }
      ];
    } else if (path.includes('/consumer')) {
      return [
        { to: '/consumer', label: 'HOME' },
        { to: '/consumer/verify-product', label: 'VERIFY PRODUCT' },
        { to: '/consumer/purchase-history', label: 'PURCHASE HISTORY' }
      ];
    } else {
      // Main navbar for home page
      return [
        { to: '/', label: 'HOME' },
        { to: '/manufacturer', label: 'MANUFACTURER' },
        { to: '/seller', label: 'SELLER' },
        { to: '/consumer', label: 'CONSUMER' }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="navbar">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className={location.pathname === item.to ? 'active' : ''}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 