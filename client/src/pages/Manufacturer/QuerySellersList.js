import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const QuerySellersList = () => {
  const [sellerId, setSellerId] = useState('');
  const [sellerInfo, setSellerInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setSellerInfo(null);
    
    try {
      // Validate input
      if (!sellerId) {
        setMessage('Please enter a seller ID');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.querySellersList(sellerId); //Enter Manufacturer ID
      
      if (result) {
        setSellerInfo({
          id: result.sellerId,
          name: result.sellerName,
          brand: result.sellerBrand,
          code: result.sellerCode,
          // Add other seller fields as needed
        });
      } else {
        setMessage('Seller not found or not authorized to view this information');
      }
    } catch (error) {
      console.error('Error querying seller:', error);
      setMessage('Error querying seller: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Query Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Seller ID</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
                placeholder="Enter seller ID"
              />
            </div>
            <div className="form-col">
              {/* Empty column for layout balance */}
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Querying...' : 'Query Seller'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
        
        {sellerInfo && (
          <div className="info-container">
            <h3>Seller Information</h3>
            <p><strong>Seller ID:</strong> {sellerInfo.id}</p>
            <p><strong>Name:</strong> {sellerInfo.name}</p>
            <p><strong>Brand:</strong> {sellerInfo.brand}</p>
            <p><strong>Code:</strong> {sellerInfo.code}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuerySellersList; 