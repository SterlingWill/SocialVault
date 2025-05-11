'use client';

import { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const handleWalletConnect = (address: string) => {
    setConnectedAddress(address);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="z-10 max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SocialVault
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your decentralized social media backup solution
          </p>
          <WalletConnect onWalletConnect={handleWalletConnect} />
        </header>

        {connectedAddress && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Connected Platforms</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Total Backups</h3>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800">Storage Used</h3>
                <p className="text-2xl font-bold text-purple-600">0 MB</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}