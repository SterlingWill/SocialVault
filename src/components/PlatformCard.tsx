'use client';

interface PlatformCardProps {
  platform: {
    id: string;
    name: string;
    icon: string;
    connected: boolean;
    lastBackup?: Date;
  };
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
}

export default function PlatformCard({ platform, onConnect, onDisconnect }: PlatformCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl">{platform.icon}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{platform.name}</h3>
            {platform.lastBackup && (
              <p className="text-sm text-gray-500">
                Last backup: {platform.lastBackup.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          platform.connected
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {platform.connected ? 'Connected' : 'Not connected'}
        </div>
      </div>

      <div className="flex space-x-2">
        {platform.connected ? (
          <>
            <button
              onClick={() => onDisconnect(platform.id)}
              className="flex-1 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              Disconnect
            </button>
            <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Backup Now
            </button>
          </>
        ) : (
          <button
            onClick={() => onConnect(platform.id)}
            className="w-full px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}