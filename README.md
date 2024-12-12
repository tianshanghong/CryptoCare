# CryptoCare

CryptoCare is a Web3 donation platform that enables direct ETH transfers to verified donation cases. Built with Next.js, Onchain Kit by Coinbase, and Solidity smart contracts.

## Smart Contract

The core of CryptoCare is a Solidity smart contract deployed on Base Testnet (Sepolia). The contract manages donation cases and handles direct ETH transfers to beneficiaries.

### Contract Features

- Create donation cases (admin only)
- Verify donation cases (admin only)
- Direct ETH transfers to beneficiaries
- Case verification system
- Event emission for frontend tracking

### Contract Address

- Base Testnet (Sepolia): `[Contract Address After Deployment]`

### Smart Contract Development

```bash
# Install dependencies
yarn install

# Compile contracts
yarn hardhat compile

# Run tests
yarn hardhat test

# Deploy to Base Testnet
yarn hardhat run scripts/deploy.js --network base-testnet
```

### Contract Testing

The test suite covers:
- Case creation and management
- Verification functionality
- Donation processing
- Access control

### Deployment Process

1. Set up environment variables in `.env`:
```env
PRIVATE_KEY=your_wallet_private_key
BASE_TESTNET_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

2. Get test ETH:
   - Get Sepolia ETH from [Sepolia Faucet](https://sepoliafaucet.com)
   - Bridge to Base using [Base Bridge](https://bridge.base.org/deposit)

3. Deploy contract:
```bash
yarn hardhat run scripts/deploy.js --network base-testnet
```

4. Verify contract on BaseScan:
```bash
yarn hardhat verify --network base-testnet [CONTRACT_ADDRESS]
```

## Tech Stack

- Next.js 14
- Onchain Kit by Coinbase
- Hardhat for smart contract development
- Ethers.js for blockchain interactions
- Solidity ^0.8.20
- TypeScript
- Tailwind CSS

## Project Structure

```
crypto-care/
├── contracts/             # Smart contracts
│   └── CryptoCare.sol    # Main contract
├── scripts/              # Deployment scripts
│   └── deploy.js
├── test/                 # Contract tests
│   └── CryptoCare.test.ts
├── src/                  # Frontend application
│   ├── app/             # Next.js pages
│   └── components/      # React components
└── hardhat.config.js    # Hardhat configuration
```

## Local Development

1. Clone the repository
```bash
git clone https://github.com/tianshanghong/crypto-care.git
cd crypto-care
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

4. Start the development server
```bash
yarn dev
```

## Security

- Private keys are never committed to the repository
- Admin functions are protected with access control
- Direct ETH transfers to beneficiaries
- Contract verified on BaseScan

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Base for the L2 infrastructure
- OpenZeppelin for smart contract libraries
- Next.js team for the framework
