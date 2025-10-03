const hre = require("hardhat");

async function main() {
  const [sender] = await hre.ethers.getSigners();

  const recipientAddress = "0xE81032A865Dd45BF39E8430f72b9FA8f2e2Cb030";
  const amount = hre.ethers.parseEther("0.1"); // Send 0.1 POL

  console.log("Sending 0.1 POL from:", sender.address);
  console.log("To:", recipientAddress);

  const tx = await sender.sendTransaction({
    to: recipientAddress,
    value: amount,
  });

  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("✓ Sent 0.1 POL successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
