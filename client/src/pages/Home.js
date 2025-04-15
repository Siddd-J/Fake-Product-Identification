import React from 'react';
import './Pages.css';

const Home = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <h2>WELCOME</h2>
        <p>This DApp helps prevent counterfeit products by tracking product authenticity on the blockchain.</p>
        <p>Please select a role from the navigation menu above:</p>
        <ul>
          <li><strong>Manufacturer:</strong> Add new products and sellers to the system</li>
          <li><strong>Seller:</strong> Manage and sell products to customers</li>
          <li><strong>Consumer:</strong> Verify product authenticity</li>
        </ul>
      </div>
    </div>
  );
};

export default Home; 