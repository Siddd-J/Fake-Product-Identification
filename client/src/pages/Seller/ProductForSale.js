import React, { useState, useEffect } from 'react';
import Web3Service from '../../Web3Service';
import '../Pages.css';

const ProductForSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sellerId, setSellerId] = useState('');
  
  const loadProducts = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (!sellerId) {
        setError('Please enter a seller ID');
        setLoading(false);
        return;
      }
      
      // This would be replaced with the actual contract call
      // In a real app, you would fetch products assigned to this seller
      // This is a placeholder as the exact contract method depends on your implementation
      const sellerInfo = await Web3Service.querySeller(sellerId);
      
      if (sellerInfo) {
        // Mock data for demonstration
        // In a real app, you would fetch real product data from the blockchain
        setProducts([
          { id: '1', name: 'Product 1', brand: 'Brand A', price: '500' },
          { id: '2', name: 'Product 2', brand: 'Brand B', price: '750' },
          { id: '3', name: 'Product 3', brand: 'Brand C', price: '1200' }
        ]);
      } else {
        setError('Seller not found or has no products assigned');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Error loading products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Products For Sale</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Seller ID</label>
              <input 
                type="text" 
                className="form-input"
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)}
                placeholder="Enter your seller ID"
              />
            </div>
            <div className="form-col">
              <button type="submit" className="form-button" style={{marginTop: '25px'}}>
                {loading ? 'Loading...' : 'Load Products'}
              </button>
            </div>
          </div>
        </form>
        
        {error && <div className="info-message">{error}</div>}
        
        {products.length > 0 && (
          <div className="info-container">
            <h3>Available Products</h3>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>ID</th>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Name</th>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Brand</th>
                  <th style={{textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd'}}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{product.id}</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{product.name}</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{product.brand}</td>
                    <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{product.price}</td>
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

export default ProductForSale; 