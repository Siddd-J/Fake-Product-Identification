# Fake Product Identification DApp

A blockchain-based DApp for identifying counterfeit products using Ethereum smart contracts.

## Prerequisites

- Node.js and npm
- Truffle (`npm install -g truffle`)
- Ganache - Local Ethereum blockchain
- MetaMask browser extension

## Setup Instructions

1. Clone the repository
   ```
   git clone https://github.com/your-username/fake-product-identification.git
   cd fake-product-identification
   ```

2. Install dependencies
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Start Ganache
   - Open Ganache
   - Create a new workspace
   - Configure to use port 7545

4. Compile and deploy smart contracts
   ```
   truffle compile
   truffle migrate
   ```

5. Start the React application
   ```
   cd client
   npm start
   ```

6. Connect MetaMask to your local Ganache blockchain
   - Open MetaMask
   - Create a new network with URL: http://127.0.0.1:7545
   - Import accounts from Ganache using private keys

## Application Structure

- **Manufacturer**: Add products and sellers, sell products to registered sellers
- **Seller**: View products for sale, sell products to customers
- **Consumer**: Verify product authenticity, view purchase history

## Technology Stack

- **Front-end**: React.js
- **Smart Contracts**: Solidity
- **Blockchain**: Ethereum (local development via Ganache)
- **Contract Development**: Truffle Framework
- **Web3 Integration**: Web3.js 