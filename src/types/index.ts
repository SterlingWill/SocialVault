export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastBackup?: Date;
}

export interface DataEntry {
  id: string;
  ipfsHash: string;
  timestamp: number;
  platform: string;
  encrypted: boolean;
  size: number;
  description?: string;
}

export interface UserProfile {
  address: string;
  registered: boolean;
  totalBackups: number;
  platforms: SocialPlatform[];
  storage: {
    used: number;
    limit: number;
  };
}

export interface BackupConfig {
  platform: string;
  includeImages: boolean;
  includeVideos: boolean;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  encrypt: boolean;
}