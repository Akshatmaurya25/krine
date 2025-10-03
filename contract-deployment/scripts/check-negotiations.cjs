const hre = require("hardhat");

async function main() {
  console.log("Checking Negotiation contract state...\n");

  const negotiationAddress = "0x229016d64ECb1543d52512B207420409E9D0127A";
  const Negotiation = await hre.ethers.getContractFactory("Negotiation");
  const negotiation = Negotiation.attach(negotiationAddress);

  // Check negotiation count
  const count = await negotiation.negotiationCount();
  console.log("Total negotiations:", count.toString());

  if (count > 0) {
    console.log("\nNegotiations:");
    for (let i = 0; i < count; i++) {
      console.log(`\n--- Negotiation ID: ${i} ---`);
      try {
        const data = await negotiation.getNegotiation(i);
        console.log("ID:", data[0].toString());
        console.log("Buyer:", data[1]);
        console.log("Seller:", data[2]);
        console.log("Domain:", data[3]);
        console.log("Initial Offer:", hre.ethers.formatEther(data[4]), "MATIC");
        console.log("Current Offer:", hre.ethers.formatEther(data[5]), "MATIC");
        console.log("Status:", data[6].toString());
        console.log("Created At:", new Date(Number(data[7]) * 1000).toLocaleString());
        console.log("Updated At:", new Date(Number(data[8]) * 1000).toLocaleString());

        // Check messages
        const messages = await negotiation.getMessages(i);
        console.log("Messages:", messages.length);
        messages.forEach((msg, idx) => {
          console.log(`  Message ${idx}:`, {
            sender: msg.sender,
            content: msg.content,
            offerAmount: hre.ethers.formatEther(msg.offerAmount),
            timestamp: new Date(Number(msg.timestamp) * 1000).toLocaleString(),
          });
        });
      } catch (error) {
        console.error("Error reading negotiation:", error.message);
      }
    }
  } else {
    console.log("\nNo negotiations found in the contract.");
    console.log("You need to create a negotiation first!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
