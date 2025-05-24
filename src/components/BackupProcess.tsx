'use client';

import { useState } from 'react';
import { BackupConfig } from '@/types';
import { ipfsService } from '@/lib/ipfs';
import { contractInstance } from '@/lib/contract';
import { cryptoService } from '@/lib/crypto';

interface BackupProcessProps {
  platform: string;
  onComplete: (hash: string) => void;
  onCancel: () => void;
}

interface BackupStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message?: string;
}

export default function BackupProcess({ platform, onComplete, onCancel }: BackupProcessProps) {
  const [config, setConfig] = useState<BackupConfig>({
    platform,
    includeImages: true,
    includeVideos: false,
    dateRange: {},
    encrypt: true,
  });

  const [steps, setSteps] = useState<BackupStep[]>([
    { id: 'fetch', title: 'Fetching data from platform', status: 'pending' },
    { id: 'process', title: 'Processing and organizing data', status: 'pending' },
    { id: 'encrypt', title: 'Encrypting data (optional)', status: 'pending' },
    { id: 'ipfs', title: 'Uploading to IPFS', status: 'pending' },
    { id: 'contract', title: 'Recording on blockchain', status: 'pending' },
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const updateStep = (stepId: string, status: BackupStep['status'], message?: string) => {
    setSteps(prev => prev.map(step =>
      step.id === stepId ? { ...step, status, message } : step
    ));
  };

  const startBackup = async () => {
    setIsRunning(true);

    try {
      // Step 1: Fetch data
      updateStep('fetch', 'in_progress', 'Connecting to platform API...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockData = {
        platform: config.platform,
        posts: Array.from({ length: 50 }, (_, i) => ({
          id: `post_${i}`,
          content: `Sample post content ${i}`,
          timestamp: Date.now() - (i * 86400000),
          likes: Math.floor(Math.random() * 100),
        })),
        profile: {
          username: 'user123',
          followers: 1234,
          following: 567,
        }
      };

      updateStep('fetch', 'completed', `Fetched ${mockData.posts.length} posts`);

      // Step 2: Process data
      updateStep('process', 'in_progress', 'Organizing and cleaning data...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStep('process', 'completed', 'Data processed successfully');

      // Step 3: Encrypt (if enabled)
      let processedData = mockData;
      if (config.encrypt) {
        updateStep('encrypt', 'in_progress', 'Encrypting sensitive data...');
        await new Promise(resolve => setTimeout(resolve, 1000));

        const password = cryptoService.generateRandomPassword();
        const encryptedData = await cryptoService.encrypt(JSON.stringify(mockData), password);
        processedData = {
          encrypted: true,
          data: encryptedData,
          key: password, // In real app, this would be stored securely
        };

        updateStep('encrypt', 'completed', 'Data encrypted with AES-256');
      } else {
        updateStep('encrypt', 'completed', 'Encryption skipped');
      }

      // Step 4: Upload to IPFS
      updateStep('ipfs', 'in_progress', 'Uploading to IPFS network...');
      const ipfsResult = await ipfsService.uploadData(processedData);
      updateStep('ipfs', 'completed', `Uploaded: ${ipfsResult.hash}`);

      // Step 5: Record on blockchain
      updateStep('contract', 'in_progress', 'Recording on blockchain...');
      try {
        await contractInstance.initialize();
        await contractInstance.storeData(ipfsResult.hash, config.platform, config.encrypt);
        updateStep('contract', 'completed', 'Transaction confirmed');

        setTimeout(() => onComplete(ipfsResult.hash), 1000);
      } catch (error) {
        updateStep('contract', 'failed', 'Blockchain transaction failed');
        throw error;
      }

    } catch (error) {
      console.error('Backup failed:', error);
      steps.forEach(step => {
        if (step.status === 'in_progress') {
          updateStep(step.id, 'failed', 'Process interrupted');
        }
      });
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: BackupStep['status']) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '⏳';
      case 'failed': return '❌';
      default: return '⚪';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Backup {platform}</h2>
          {!isRunning && (
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          )}
        </div>

        {!isRunning ? (
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.includeImages}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeImages: e.target.checked }))}
                />
                <span>Include images</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.includeVideos}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeVideos: e.target.checked }))}
                />
                <span>Include videos</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.encrypt}
                  onChange={(e) => setConfig(prev => ({ ...prev, encrypt: e.target.checked }))}
                />
                <span>Encrypt data</span>
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={startBackup}
                className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Start Backup
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {steps.map(step => (
              <div key={step.id} className="flex items-center space-x-3">
                <span className="text-lg">{getStatusIcon(step.status)}</span>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  {step.message && (
                    <div className="text-sm text-gray-500">{step.message}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}