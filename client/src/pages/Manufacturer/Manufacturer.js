import React from 'react';
import '../Pages.css';

const Manufacturer = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <h2>Manufacturer</h2>
        <p>Go to navigation bar to perform operations.</p>
        <div className="info-container">
          <p>As a Manufacturer, you can:</p>
          <ul>
            <li>Add new products to the blockchain</li>
            <li>Add new sellers to the system</li>
            <li>Sell products to registered sellers</li>
            <li>Query seller information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer; 