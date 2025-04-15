import React from 'react';
import '../Pages.css';

const Seller = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <h2>Seller</h2>
        <p>Go to navigation bar to perform operations.</p>
        <div className="info-container">
          <p>As a Seller, you can:</p>
          <ul>
            <li>View products available for sale</li>
            <li>Sell products to customers</li>
            <li>Query seller information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Seller; 