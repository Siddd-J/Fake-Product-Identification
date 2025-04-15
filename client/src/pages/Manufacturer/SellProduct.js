import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const SellProduct = () => {
  const [productSN, setProductSN] = useState('');
  const [sellerCode, setSellerCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Validate inputs
      if (!productSN || !sellerCode) {
        setMessage('Please fill all fields');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.sellProductToSeller(
        productSN,
        sellerCode
      );
      
      setMessage('Product sold to seller successfully! Transaction hash: ' + result.transactionHash);
      
      // Clear form
      setProductSN('');
      setSellerCode('');
    } catch (error) {
      console.error('Error selling product to seller:', error);
      setMessage('Error selling product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Sell Product to Seller</h2>
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
              <label className="form-label">Seller Code</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerCode}
                onChange={(e) => setSellerCode(e.target.value)}
                placeholder="Enter seller code"
              />
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sell Product to Seller'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
      </div>
    </div>
  );
};

export default SellProduct; 