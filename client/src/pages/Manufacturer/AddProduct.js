import React, { useState } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const AddProduct = () => {
  const [manufacturerId, setManufacturerId] = useState('');
  const [productSN, setProductSN] = useState('');
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Validate inputs
      if (!manufacturerId || !productSN || !productName || !productBrand || !productPrice) {
        setMessage('Please fill all fields');
        setIsLoading(false);
        return;
      }

      // Call the contract method
      const result = await Web3Service.addProduct(
        manufacturerId, 
        productSN, 
        productName, 
        productBrand, 
        Number(productPrice)
      );
      
      setMessage('Product added successfully! Transaction hash: ' + result.transactionHash);
      
      // Clear form
      setManufacturerId('');
      setProductSN('');
      setProductName('');
      setProductBrand('');
      setProductPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Manufacturer ID</label>
              <input 
                type="text" 
                className="form-input"
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                placeholder="e.g. 15652"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Product SN</label>
              <input 
                type="text" 
                className="form-input"
                value={productSN}
                onChange={(e) => setProductSN(e.target.value)}
                placeholder="e.g. 13cs31"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Product Name</label>
              <input 
                type="text" 
                className="form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Raymond's Denim"
              />
            </div>
            <div className="form-col">
              <label className="form-label">Product Brand</label>
              <input 
                type="text" 
                className="form-input"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
                placeholder="e.g. Raymond"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Product Price</label>
              <input 
                type="number" 
                className="form-input"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="e.g. 750"
              />
            </div>
            <div className="form-col">
              {/* Empty column for layout balance */}
            </div>
          </div>
          
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Add the Product'}
          </button>
        </form>
        
        {message && <div className="info-message">{message}</div>}
      </div>
    </div>
  );
};

export default AddProduct; 