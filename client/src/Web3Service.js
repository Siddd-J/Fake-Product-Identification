import Web3 from 'web3';
import AssetTracker from './contracts/AssetTracker.json';
import Production from './contracts/Production.json';

class Web3Service {
  constructor() {
    this.web3 = null;
    this.accounts = [];
    this.assetTrackerContract = null;
    this.productionContract = null;
    this.networkId = null;
  }

  async init() {
    try {
      // Use Web3 injected by MetaMask or connect to local Ganache
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        // Fallback to Ganache
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
      }

      // Get accounts
      this.accounts = await this.web3.eth.getAccounts();
      
      // Get network ID
      this.networkId = await this.web3.eth.net.getId();
      
      // Initialize contracts
      this.initContracts();
      
      return {
        web3: this.web3,
        accounts: this.accounts,
        assetTracker: this.assetTrackerContract,
        production: this.productionContract
      };
    } catch (error) {
      console.error('Could not connect to blockchain network:', error);
      throw error;
    }
  }

  initContracts() {
    try {
      // Initialize AssetTracker contract
      const assetTrackerNetwork = AssetTracker.networks[this.networkId];
      if (assetTrackerNetwork) {
        this.assetTrackerContract = new this.web3.eth.Contract(
          AssetTracker.abi,
          assetTrackerNetwork.address
        );
      }

      // Initialize Production contract
      const productionNetwork = Production.networks[this.networkId];
      if (productionNetwork) {
        this.productionContract = new this.web3.eth.Contract(
          Production.abi,
          productionNetwork.address
        );
      }
    } catch (error) {
      console.error('Failed to initialize contracts:', error);
    }
  }

  // Utility method to convert string to bytes32
  stringToBytes32(text) {
    return this.web3.utils.padRight(this.web3.utils.asciiToHex(text), 64);
  }

  // Get current account
  async getCurrentAccount() {
    if (this.accounts.length === 0) {
      this.accounts = await this.web3.eth.getAccounts();
    }
    return this.accounts[0];
  }

  // Production contract methods
  async addProduct(manufacturerId, productSN, productName, productBrand, productPrice) {
    const account = await this.getCurrentAccount();
    
    // Convert string inputs to bytes32
    const manufacturerIdBytes32 = this.stringToBytes32(manufacturerId);
    const productSNBytes32 = this.stringToBytes32(productSN);
    const productNameBytes32 = this.stringToBytes32(productName);
    const productBrandBytes32 = this.stringToBytes32(productBrand);
    
    return this.productionContract.methods.addProduct(
      manufacturerIdBytes32,
      productSNBytes32,
      productNameBytes32,
      productBrandBytes32,
      productPrice
    ).send({ from: account });
  }

  async addSeller(manufacturerId, sellerName, sellerBrand, sellerCode, sellerNum, sellerManager, sellerAddress) {
    const account = await this.getCurrentAccount();
    
    // Convert string inputs to bytes32
    const manufacturerIdBytes32 = this.stringToBytes32(manufacturerId);
    const sellerNameBytes32 = this.stringToBytes32(sellerName);
    const sellerBrandBytes32 = this.stringToBytes32(sellerBrand);
    const sellerCodeBytes32 = this.stringToBytes32(sellerCode);
    const sellerManagerBytes32 = this.stringToBytes32(sellerManager);
    const sellerAddressBytes32 = this.stringToBytes32(sellerAddress);
    
    return this.productionContract.methods.addSeller(
      manufacturerIdBytes32,
      sellerNameBytes32,
      sellerBrandBytes32,
      sellerCodeBytes32,
      sellerNum, // This is a number, so no conversion needed
      sellerManagerBytes32,
      sellerAddressBytes32
    ).send({ from: account });
  }

  async sellProductToSeller(productId, sellerId) {
    const account = await this.getCurrentAccount();
    
    // Convert string inputs to bytes32
    const productIdBytes32 = this.stringToBytes32(productId);
    const sellerIdBytes32 = this.stringToBytes32(sellerId);
    
    return this.productionContract.methods.manufacturerSellProduct(
      productIdBytes32,
      sellerIdBytes32
    ).send({ from: account });
  }

  async querySellersList(sellerId) {
    // Convert string input to bytes32
    const sellerIdBytes32 = this.stringToBytes32(sellerId);
    
    return this.productionContract.methods.querySellersList(sellerIdBytes32).call();
  }

  async queryProduct(productId) {
    // Convert string input to bytes32
    const productIdBytes32 = this.stringToBytes32(productId);
    
    return this.productionContract.methods.queryProduct(productIdBytes32).call();
  }

  // Methods for Seller functionalities
  async sellProductToCustomer(productId, customerAddress) {
    const account = await this.getCurrentAccount();
    
    // Convert string inputs to bytes32
    const productIdBytes32 = this.stringToBytes32(productId);
    const customerAddressBytes32 = this.stringToBytes32(customerAddress);
    
    return this.productionContract.methods.sellerSellProduct(
      productIdBytes32,
      customerAddressBytes32
    ).send({ from: account });
  }

  // Methods for Customer functionalities
  async verifyProduct(productId, consumerCode) {
    // Convert string inputs to bytes32
    const productIdBytes32 = this.stringToBytes32(productId);
    const consumerCodeBytes32 = this.stringToBytes32(consumerCode);
    
    return this.productionContract.methods.verifyProduct(
      productIdBytes32,
      consumerCodeBytes32
    ).call();
  }

  async getPurchaseHistory(consumerCode) {
    // Convert string input to bytes32
    const consumerCodeBytes32 = this.stringToBytes32(consumerCode);
    
    return this.productionContract.methods.getPurchaseHistory(consumerCodeBytes32).call();
  }

  // Utility method to convert bytes32 to string
  bytes32ToString(bytes32) {
    return this.web3.utils.hexToAscii(bytes32).replace(/\u0000/g, '');
  }
}

export default new Web3Service();
