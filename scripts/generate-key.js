const { ethers } = require("ethers");

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

console.log("New wallet generated!");
console.log("Address:", wallet.address);
console.log("Private key (for .env):", wallet.privateKey.slice(2)); // Remove '0x' prefix
console.log("\nIMPORTANT: Save these somewhere safe and NEVER share your private key!");
console.log("This is a test wallet - only use it on testnets!"); 