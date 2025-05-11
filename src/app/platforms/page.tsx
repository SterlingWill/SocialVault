'use client';

import { useState } from 'react';
import PlatformCard from '@/components/PlatformCard';
import { SocialPlatform } from '@/types';

const initialPlatforms: SocialPlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: '𝕏',
    connected: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    connected: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    connected: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    connected: false,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '📺',
    connected: false,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    connected: false,
  },
];

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(initialPlatforms);

  const handleConnect = (platformId: string) => {
    console.log('Connecting to platform:', platformId);
    setPlatforms(prev =>
      prev.map(platform =>
        platform.id === platformId
          ? { ...platform, connected: true, lastBackup: new Date() }
          : platform
      )
    );
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(prev =>
      prev.map(platform =>
        platform.id === platformId
          ? { ...platform, connected: false, lastBackup: undefined }
          : platform
      )
    );
  };

  const connectedPlatforms = platforms.filter(p => p.connected);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connected Platforms</h1>
          <p className="text-gray-600">
            Connect your social media accounts to start backing up your data.
          </p>
        </div>

        {connectedPlatforms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Connected ({connectedPlatforms.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedPlatforms.map(platform => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.filter(p => !p.connected).map(platform => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}