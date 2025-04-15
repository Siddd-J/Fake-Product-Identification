import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const VerifyProduct = () => {
  const [productId, setProductId] = useState('');
  const [consumerCode, setConsumerCode] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setProductInfo(null);
    
    try {
      // Validate input
      if (!productId || !consumerCode) {
        setMessage('Please enter both product ID and consumer code');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.verifyProduct(productId, consumerCode);
      
      if (result) {
        // In a real implementation, you might need to fetch product details separately
        // For now, we'll just display a success message
        setProductInfo({
          id: productId,
          isAuthentic: result
        });
        setMessage('Product verification successful!');
      } else {
        setMessage('Warning: This product may be counterfeit or has an invalid supply chain.');
      }
    } catch (error) {
      console.error('Error verifying product:', error);
      setMessage('Error verifying product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Verify Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Product ID</label>
              <input 
                type="text" 
                className="form-input"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Consumer Code</label>
              <input 
                type="text" 
                className="form-input"
                value={consumerCode}
                onChange={(e) => setConsumerCode(e.target.value)}
                placeholder="Enter your consumer code"
              />
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Product'}
          </button>
        </form>
        
        {message && (
          <div className="info-message" style={{
            backgroundColor: productInfo && productInfo.isAuthentic ? '#d4edda' : '#f8d7da',
            color: productInfo && productInfo.isAuthentic ? '#155724' : '#721c24'
          }}>
            {message}
          </div>
        )}
        
        {productInfo && productInfo.isAuthentic && (
          <div className="info-container">
            <h3>Product Information</h3>
            <p><strong>Product ID:</strong> {productInfo.id}</p>
            <p><strong>Status:</strong> Authentic</p>
            <p>This product is verified authentic and was purchased by you.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyProduct; 