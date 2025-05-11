'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletConnectProps {
  onWalletConnect: (address: string) => void;
}

export default function WalletConnect({ onWalletConnect }: WalletConnectProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onWalletConnect(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask.');
      return;
    }

    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        onWalletConnect(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div className="flex items-center space-x-4">
      {account ? (
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}