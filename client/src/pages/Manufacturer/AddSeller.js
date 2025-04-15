import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const AddSeller = () => {
  const [manufacturerId, setManufacturerId] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerBrand, setSellerBrand] = useState('');
  const [sellerCode, setSellerCode] = useState('');
  const [sellerNum, setSellerNum] = useState('');
  const [sellerManager, setSellerManager] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Validate inputs
      if (!manufacturerId || !sellerName || !sellerBrand || !sellerCode || !sellerNum || !sellerManager || !sellerAddress) {
        setMessage('Please fill all fields');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.addSeller(
        manufacturerId,
        sellerName, 
        sellerBrand, 
        sellerCode,
        parseInt(sellerNum),  // Convert to integer
        sellerManager,
        sellerAddress
      );
      
      setMessage('Seller added successfully! Transaction hash: ' + result.transactionHash);
      
      // Clear form
      setManufacturerId('');
      setSellerName('');
      setSellerBrand('');
      setSellerCode('');
      setSellerNum('');
      setSellerManager('');
      setSellerAddress('');
    } catch (error) {
      console.error('Error adding seller:', error);
      setMessage('Error adding seller: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Add Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Manufacturer ID</label>
              <input 
                type="text" 
                className="form-input"
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                placeholder="Enter manufacturer ID"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Seller Name</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Enter seller name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Seller Brand</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerBrand}
                onChange={(e) => setSellerBrand(e.target.value)}
                placeholder="Enter seller brand"
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
          
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Seller Number</label>
              <input 
                type="number" 
                className="form-input"
                value={sellerNum}
                onChange={(e) => setSellerNum(e.target.value)}
                placeholder="Enter seller number"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Seller Manager</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerManager}
                onChange={(e) => setSellerManager(e.target.value)}
                placeholder="Enter seller manager"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Seller Address</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
                placeholder="Enter seller address"
              />
            </div>
            <div className="form-col">
              {/* Empty column for layout balance */}
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Add Seller'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
      </div>
    </div>
  );
};

export default AddSeller; 