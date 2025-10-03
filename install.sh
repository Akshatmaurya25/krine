#!/bin/bash

echo "Installing Krine dependencies..."

# Install web3 dependencies
echo "Installing Web3 dependencies..."
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit

# Install Hardhat and Solidity dependencies
echo "Installing Hardhat dependencies..."
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ethers ethers dotenv

echo "Installation complete!"
echo "Next steps:"
echo "1. Copy .env.example to .env"
echo "2. Fill in your WalletConnect Project ID and private key"
echo "3. Run 'npx hardhat compile' to compile contracts"
echo "4. Run 'npx hardhat run scripts/deploy.js --network amoy' to deploy"
echo "5. Update .env with deployed contract addresses"
echo "6. Run 'npm run dev' to start the application"
