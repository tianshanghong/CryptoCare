# CryptoCare

CryptoCare is a Web3 donation platform that enables direct ETH transfers to verified donation cases. Built with Next.js, Onchain Kit by Coinbase, and Solidity smart contracts.

## Features

### MVP Features
- **Smart Contract**
  - Create donation cases (admin only)
  - Verify donation cases (admin only)
  - Direct ETH transfers to beneficiaries
  - Case verification system

### Tech Stack
- Next.js 14
- Onchain Kit by Coinbase
- Hardhat for smart contract development
- Ethers.js for blockchain interactions
- Solidity ^0.8.20
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- MetaMask or Coinbase Wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/tianshanghong/crypto-care.git
cd crypto-care
```

2. Install dependencies
```bash
yarn install
```

3. Compile smart contracts
```bash
yarn hardhat clean
yarn hardhat compile
```

4. Run tests
```bash
yarn hardhat test
```

5. Start the development server
```bash
yarn dev
```

### Smart Contract Development

The main smart contract `CryptoCare.sol` includes:
- Donation case management
- Verification system
- Direct ETH transfers
- Event emission for frontend tracking

### Testing

The test suite covers:
- Case creation and management
- Verification functionality
- Donation processing
- Access control

## Project Structure

```
crypto-care/
├── app/                    # Next.js application files
├── contracts/             # Solidity smart contracts
│   └── CryptoCare.sol    # Main contract
├── test/                 # Test files
│   └── CryptoCare.test.ts
└── hardhat.config.ts    # Hardhat configuration
```

## Acknowledgments

- Coinbase for Onchain Kit
- OpenZeppelin for smart contract libraries
- Next.js team for the amazing framework
