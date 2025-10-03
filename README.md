# Krine - On-Chain Domain Negotiation Platform

Krine is a decentralized platform for secure domain trading with on-chain messaging and smart contract escrow, powered by the Doma Protocol.

## Features

- **On-Chain Messaging**: Negotiate directly with domain owners through secure blockchain-based messaging
- **Smart Contract Escrow**: Automated fund management with secure escrow contracts
- **Doma Protocol Integration**: Built on Doma Protocol for verified domain ownership
- **Real-time Updates**: Live negotiation status and message updates
- **Multi-Party Support**: Buyer and seller interactions with role-based permissions

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Web3**: Wagmi, Viem, RainbowKit, TanStack Query
- **Smart Contracts**: Solidity 0.8.20
- **Development**: Hardhat, Ethers.js
- **Chain**: Polygon Amoy Testnet (EVM-compatible)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Testnet tokens (Polygon Amoy MATIC)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Get from [WalletConnect Cloud](https://cloud.walletconnect.com)
   - `PRIVATE_KEY`: Your wallet private key for contract deployment
   - Contract addresses (will be populated after deployment)

### Smart Contract Deployment

Smart contracts are in the `contract-deployment` folder:

1. **Compile contracts**
   ```bash
   cd contract-deployment
   npx hardhat compile
   ```

2. **Deploy contracts to testnet**
   ```bash
   cd contract-deployment
   npm run deploy
   # Or manually: npx hardhat run scripts/deploy.cjs --network amoy
   ```

3. **Update .env file**

   Copy the deployed contract addresses from the deployment output and update your `.env` in the root folder:
   ```
   NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x...
   ```

### Running the Application

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Connect your wallet**

   Click "Connect Wallet" and connect your MetaMask or compatible wallet

## Usage

### Starting a Negotiation

1. On the home page, enter the domain name and seller's wallet address
2. Click "Start Negotiation" and confirm the transaction
3. You'll be redirected to the negotiation page

### Negotiation Page

- **Send Messages**: Type and send messages to negotiate with the other party
- **Make Offers**: Check "Include Offer" and enter an amount to make a price offer
- **Accept/Reject** (Seller): Accept the current offer or reject the negotiation
- **View History**: Scroll through the message history

### Escrow Process

1. **Deposit**: After seller accepts, buyer deposits funds into escrow
2. **Release**: Buyer releases funds to seller after domain transfer
3. **Refund**: Seller can refund at any time, or buyer after 30 days

### Inbox

View all your active and completed negotiations in one place. Click any negotiation to continue the conversation.

## Project Structure

```
krine/
├── contracts/              # Solidity smart contracts
│   ├── Escrow.sol         # Escrow contract
│   └── Negotiation.sol    # Negotiation contract
├── scripts/               # Deployment scripts
│   └── deploy.js
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── inbox/        # Inbox page
│   │   ├── negotiation/  # Negotiation pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── providers.tsx # Web3 providers
│   ├── components/        # React components
│   │   ├── DomainSearch.tsx
│   │   ├── EscrowActions.tsx
│   │   ├── Inbox.tsx
│   │   ├── NegotiationChat.tsx
│   │   └── WalletConnect.tsx
│   └── lib/               # Libraries and utilities
│       ├── contracts/     # Contract ABIs and configs
│       └── wagmi/         # Wagmi configuration
├── hardhat.config.js      # Hardhat configuration
└── package.json
```

## Smart Contracts

### Negotiation Contract

**Key Functions:**
- `startNegotiation(seller, domain, initialOffer)` - Start a new negotiation
- `sendMessage(negotiationId, content, offerAmount)` - Send a message/offer
- `acceptOffer(negotiationId)` - Seller accepts the current offer
- `closeNegotiation(negotiationId, rejected)` - Close negotiation
- `getMessages(negotiationId)` - Retrieve all messages
- `getUserNegotiations(user)` - Get all negotiations for a user

### Escrow Contract

**Key Functions:**
- `deposit(seller, domain)` - Deposit funds (payable)
- `release(escrowId)` - Release funds to seller (buyer only)
- `refund(escrowId)` - Refund to buyer (seller anytime, buyer after 30 days)
- `getEscrow(escrowId)` - Get escrow details

## Development

### Running Tests

```bash
npx hardhat test
```

### Local Hardhat Network

```bash
# Terminal 1
npx hardhat node

# Terminal 2
npx hardhat run scripts/deploy.js --network localhost
```

### Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Wallet Connection Issues
- Ensure you're on the correct network (Polygon Amoy Testnet)
- Check that you have testnet tokens
- Try refreshing the page and reconnecting

### Transaction Failures
- Ensure you have enough MATIC for gas fees
- Check that contract addresses are correctly set in `.env`
- Verify you have the correct permissions (buyer/seller)

### Contract Not Found
- Verify contract addresses in `.env` match deployed contracts
- Ensure you're on the correct network
- Check that contracts are deployed successfully

## Security Considerations

⚠️ **This is a hackathon MVP project**. For production use:
- Conduct thorough smart contract audits
- Implement additional access controls
- Add dispute resolution mechanisms
- Implement proper domain ownership verification via Doma Protocol APIs
- Add rate limiting and spam protection
- Implement comprehensive error handling

## Contributing

This project was built for the Doma Protocol Hackathon. Contributions, issues, and feature requests are welcome!

## License

MIT

## Acknowledgments

- Built for the Doma Protocol Hackathon
- Powered by Doma Protocol
- Uses RainbowKit for wallet connectivity
- Deployed on Polygon network

## Contact & Support

For questions or support, please open an issue in the repository.

---

**Happy Trading! 🚀**
