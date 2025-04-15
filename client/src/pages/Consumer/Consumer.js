import React from 'react';
import '../Pages.css';

const Consumer = () => {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <h2>Consumer</h2>
        <p>Go to navigation bar to perform operations.</p>
        <div className="info-container">
          <p>As a Consumer, you can:</p>
          <ul>
            <li>Verify the authenticity of products</li>
            <li>View your purchase history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Consumer; 