const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  // Deploy the contract
  const EscrowManager = await ethers.getContractFactory("EscrowManager");
  const escrowManager = await EscrowManager.deploy();
  console.log("EscrowManager deployed to:", escrowManager.address);

  // Automatically update .env with the deployed contract address
  updateEnvFile(escrowManager.address);
}

function updateEnvFile(contractAddress) {
  const envFilePath = "./.env";
  const newEnvContent = `VITE_CONTRACT_ADDRESS=${contractAddress}\n`;

  // Read the current .env file (if exists) and append the contract address
  fs.readFile(envFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log("Could not read .env file, creating a new one.");
      fs.writeFileSync(envFilePath, newEnvContent);
    } else {
      const newContent = data + newEnvContent;
      fs.writeFileSync(envFilePath, newContent);
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
