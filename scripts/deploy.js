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
  let envContent = "";

  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf8");
    envContent = envContent.replace(/VITE_CONTRACT_ADDRESS=.*/g, "");
  }

  envContent += `\nVITE_CONTRACT_ADDRESS=${contractAddress}\n`;
  fs.writeFileSync(envFilePath, envContent.trim());
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
