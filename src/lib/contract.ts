import { ethers } from 'ethers';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_platform",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_encrypted",
        "type": "bool"
      }
    ],
    "name": "storeData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserDataCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "registeredUsers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export class SocialVaultContract {
  private contract: ethers.Contract | null = null;
  private provider: ethers.BrowserProvider | null = null;

  async initialize() {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not detected');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  async registerUser(): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.contract.registerUser();
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async storeData(ipfsHash: string, platform: string, encrypted: boolean): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const tx = await this.contract.storeData(ipfsHash, platform, encrypted);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  async isUserRegistered(address: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.registeredUsers(address);
    } catch (error) {
      console.error('Error checking registration:', error);
      return false;
    }
  }

  async getUserDataCount(address: string): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const count = await this.contract.getUserDataCount(address);
      return Number(count);
    } catch (error) {
      console.error('Error getting data count:', error);
      return 0;
    }
  }
}

export const contractInstance = new SocialVaultContract();