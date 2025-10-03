const hre = require("hardhat");

async function main() {
  console.log("Testing Negotiation contract...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Connect to deployed contract
  const negotiationAddress = "0x229016d64ECb1543d52512B207420409E9D0127A";
  const Negotiation = await hre.ethers.getContractFactory("Negotiation");
  const negotiation = Negotiation.attach(negotiationAddress);

  console.log("\nContract address:", negotiationAddress);

  // Check if contract exists
  const code = await hre.ethers.provider.getCode(negotiationAddress);
  console.log("Contract code exists:", code !== "0x");

  // Try to call negotiationCount
  try {
    const count = await negotiation.negotiationCount();
    console.log("Current negotiation count:", count.toString());
  } catch (error) {
    console.error("Error reading negotiationCount:", error.message);
  }

  // Try to start a negotiation
  try {
    console.log("\nAttempting to start negotiation...");
    const seller = "0x0B4C5faEAF50AdE33B6F8d4b4D5fFA63D1149B11";
    const domain = "akshat.ai";
    const initialOffer = hre.ethers.parseEther("0.1");

    console.log("Seller:", seller);
    console.log("Domain:", domain);
    console.log("Initial offer:", hre.ethers.formatEther(initialOffer), "MATIC");
    console.log("Deployer (buyer):", deployer.address);

    // Estimate gas first
    const gasEstimate = await negotiation.startNegotiation.estimateGas(
      seller,
      domain,
      initialOffer
    );
    console.log("Gas estimate:", gasEstimate.toString());

    // Try the transaction
    const tx = await negotiation.startNegotiation(seller, domain, initialOffer);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("SUCCESS!");
  } catch (error) {
    console.error("\nError starting negotiation:");
    console.error("Message:", error.message);
    if (error.data) {
      console.error("Data:", error.data);
    }
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
