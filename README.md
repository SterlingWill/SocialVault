# SocialVault 🔐

A decentralized social media data backup solution built with Web3 technologies.

## Features

- **Multi-Platform Support**: Backup data from Twitter, Instagram, Facebook, LinkedIn, YouTube, and TikTok
- **Decentralized Storage**: Uses IPFS for distributed file storage
- **Blockchain Integration**: Smart contracts on Ethereum for data ownership verification
- **End-to-End Encryption**: Optional AES-256 encryption for sensitive data
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum, Solidity, ethers.js
- **Storage**: IPFS (InterPlanetary File System)
- **Encryption**: Web Crypto API with AES-GCM

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/YourUsername/SocialVault.git
cd SocialVault
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

1. **Connect Wallet**: Connect your MetaMask wallet to get started
2. **Link Platforms**: Connect your social media accounts
3. **Configure Backup**: Choose what data to include and encryption preferences
4. **Start Backup**: The system will fetch, process, and store your data on IPFS
5. **View History**: Monitor all your backups in the history page

## Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────┐
│   Frontend      │────│   Smart      │────│    IPFS     │
│   (Next.js)     │    │   Contract   │    │   Storage   │
└─────────────────┘    └──────────────┘    └─────────────┘
         │                       │
         └───────────────────────┘
           MetaMask Integration
```

## Smart Contract

The SocialVault smart contract handles:
- User registration
- Data entry metadata storage
- Access control and ownership verification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Security

- Never share your private keys
- Always verify contract addresses
- Use encryption for sensitive data
- Keep your seed phrase secure

---

Built with ❤️ for decentralized data ownership