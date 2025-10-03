const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy Escrow contract
  console.log("\nDeploying Escrow contract...");
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("Escrow deployed to:", escrowAddress);

  // Deploy Negotiation contract
  console.log("\nDeploying Negotiation contract...");
  const Negotiation = await hre.ethers.getContractFactory("Negotiation");
  const negotiation = await Negotiation.deploy();
  await negotiation.waitForDeployment();
  const negotiationAddress = await negotiation.getAddress();
  console.log("Negotiation deployed to:", negotiationAddress);

  // Print summary
  console.log("\n=== Deployment Summary ===");
  console.log("Escrow Contract:", escrowAddress);
  console.log("Negotiation Contract:", negotiationAddress);
  console.log("\nAdd these addresses to your .env file:");
  console.log(`NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=${escrowAddress}`);
  console.log(`NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS=${negotiationAddress}`);

  // Wait for block confirmations
  console.log("\nWaiting for block confirmations...");
  await escrow.deploymentTransaction().wait(5);
  await negotiation.deploymentTransaction().wait(5);

  console.log("\nDeployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
