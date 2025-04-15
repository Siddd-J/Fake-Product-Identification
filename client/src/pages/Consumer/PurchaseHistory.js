import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const PurchaseHistory = () => {
  const [consumerCode, setConsumerCode] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setPurchases([]);
    
    try {
      // Validate input
      if (!consumerCode) {
        setMessage('Please enter your consumer code');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.getPurchaseHistory(consumerCode);
      
      if (result && result[0] && result[0].length > 0) {
        // result should be [productSNs, sellerCodes, manufacturerCodes]
        const formattedPurchases = [];
        
        for (let i = 0; i < result[0].length; i++) {
          // Convert bytes32 values to strings
          const productSN = Web3Service.bytes32ToString(result[0][i]);
          const sellerCode = Web3Service.bytes32ToString(result[1][i]);
          const manufacturerCode = Web3Service.bytes32ToString(result[2][i]);
          
          formattedPurchases.push({
            productId: productSN,
            seller: sellerCode,
            manufacturer: manufacturerCode,
            // Since we don't have actual purchase date in contract, we'll use a placeholder
            purchaseDate: 'N/A'
          });
        }
        
        setPurchases(formattedPurchases);
      } else {
        setMessage('No purchase history found for this consumer code');
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      setMessage('Error fetching purchase history: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Purchase History</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Your Consumer Code</label>
              <input 
                type="text" 
                className="form-input"
                value={consumerCode}
                onChange={(e) => setConsumerCode(e.target.value)}
                placeholder="Enter your consumer code"
              />
            </div>
            <div className="form-col">
              {/* Empty column for layout balance */}
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'View Purchase History'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
        
        {purchases.length > 0 && (
          <div className="info-container">
            <h3>Your Purchase History</h3>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Product ID</th>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Seller Code</th>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Manufacturer Code</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr key={index}>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{purchase.productId}</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{purchase.seller}</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{purchase.manufacturer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory; 