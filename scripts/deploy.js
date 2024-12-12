const hre = require("hardhat");

async function main() {
  console.log("Deploying CryptoCare contract...");

  const CryptoCare = await hre.ethers.getContractFactory("CryptoCare");
  const cryptoCare = await CryptoCare.deploy();

  await cryptoCare.waitForDeployment();
  const address = await cryptoCare.getAddress();

  console.log(`CryptoCare deployed to: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 