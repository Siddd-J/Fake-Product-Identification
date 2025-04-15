import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const SellToCustomer = () => {
  const [productSN, setProductSN] = useState('');
  const [consumerCode, setConsumerCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Validate inputs
      if (!productSN || !consumerCode) {
        setMessage('Please fill all fields');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.sellProductToCustomer(productSN, consumerCode);
      
      setMessage('Product sold to customer successfully! Transaction hash: ' + result.transactionHash);
      
      // Clear form
      setProductSN('');
      setConsumerCode('');
    } catch (error) {
      console.error('Error selling product to customer:', error);
      setMessage('Error selling product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Sell Product to Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Product SN</label>
              <input 
                type="text" 
                className="form-input"
                value={productSN}
                onChange={(e) => setProductSN(e.target.value)}
                placeholder="Enter product serial number"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Consumer Code</label>
              <input 
                type="text" 
                className="form-input"
                value={consumerCode}
                onChange={(e) => setConsumerCode(e.target.value)}
                placeholder="Enter consumer code"
              />
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sell Product to Customer'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
      </div>
    </div>
  );
};

export default SellToCustomer; 