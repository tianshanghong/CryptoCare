require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASE_TESTNET_RPC = process.env.BASE_TESTNET_RPC || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    "base-testnet": {
      url: BASE_TESTNET_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 84532,
      gasPrice: "auto",
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org",
        }
      }
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD"
  },
  etherscan: {
    apiKey: {
      "base-testnet": process.env.BASESCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "base-testnet",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
  mocha: {
    timeout: 40000
  }
}; 