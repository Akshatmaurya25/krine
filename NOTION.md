# Krine - On-Chain Domain Negotiation Platform

## 📋 Project Overview

**Krine** is a decentralized marketplace for domain trading built on blockchain technology. It enables secure negotiations between buyers and sellers with on-chain messaging and automated smart contract escrow, powered by the Doma Protocol.

### Hackathon Submission
- **Event**: Doma Protocol Hackathon
- **Category**: DomainFi Applications
- **Status**: MVP Complete

---

## 🎯 Problem Statement

The current domain trading landscape faces several challenges:

1. **Lack of Trust**: No secure escrow mechanism for domain transactions
2. **Inefficient Communication**: Negotiations happen off-chain through emails or third-party platforms
3. **High Friction**: Requires intermediaries, escrow services, and long settlement times
4. **Opacity**: No transparent record of negotiation history

---

## 💡 Solution

Krine solves these problems by providing:

- **On-Chain Messaging**: Transparent, immutable negotiation history
- **Smart Contract Escrow**: Trustless fund management with automated release/refund
- **Direct P2P**: Buyers and sellers negotiate directly without intermediaries
- **Doma Integration**: Leverages Doma Protocol for domain tokenization and ownership verification

---

## 🏗️ Architecture

### Smart Contracts

#### 1. Negotiation Contract (`Negotiation.sol`)
Manages the entire negotiation lifecycle:
- Start negotiations between buyer and seller
- Send/receive messages with optional offers
- Accept/reject offers
- Track negotiation status (Active, Accepted, Rejected, Closed)
- Maintain complete message history on-chain

**Key Events:**
- `NegotiationStarted` - New negotiation initiated
- `MessageSent` - New message or offer sent
- `OfferAccepted` - Seller accepts current offer
- `NegotiationClosed` - Negotiation ends

#### 2. Escrow Contract (`Escrow.sol`)
Handles fund management:
- Deposit funds from buyer
- Release funds to seller (buyer-initiated)
- Refund funds to buyer (seller anytime, buyer after 30 days)
- Track escrow status

**Key Events:**
- `Deposited` - Funds locked in escrow
- `Released` - Funds released to seller
- `Refunded` - Funds returned to buyer

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│         Next.js 15 App Router           │
├─────────────────────────────────────────┤
│  Pages:                                 │
│  • Home (Domain Search)                 │
│  • Inbox (Negotiations List)            │
│  • Negotiation Detail (Chat + Escrow)   │
├─────────────────────────────────────────┤
│  Components:                            │
│  • WalletConnect (RainbowKit)           │
│  • NegotiationChat (Production UI)      │
│  • EscrowActions                        │
│  • DomainSearch                         │
│  • Inbox                                │
├─────────────────────────────────────────┤
│  Web3 Infrastructure:                   │
│  • Wagmi (React Hooks for Ethereum)     │
│  • Viem (Ethereum utilities)            │
│  • TanStack Query (Data fetching)       │
│  • RainbowKit (Wallet connection)       │
└─────────────────────────────────────────┘
```

---

## 🚀 Features

### Core Features

✅ **Wallet Connection**
- RainbowKit integration
- Support for multiple wallets (MetaMask, WalletConnect, etc.)
- Network switching (Polygon Amoy Testnet)

✅ **Domain Search & Negotiation Initiation**
- Search by domain name
- Input seller wallet address
- Start negotiation with initial offer

✅ **Real-time Negotiation Chat**
- Send text messages
- Make price offers
- View complete negotiation history
- Real-time updates via contract events

✅ **Smart Contract Escrow**
- Deposit funds after offer accepted
- Buyer releases funds after domain transfer
- Seller or buyer can refund
- Transparent escrow status

✅ **Inbox Dashboard**
- View all negotiations (buyer and seller)
- Filter by status
- Quick access to active negotiations

### Production-Ready UI

The **Negotiation Chat** interface features:

- **Modern Design**: Clean, gradient-based UI with dark mode support
- **Intuitive Layout**: Chat-style interface similar to popular messaging apps
- **Real-time Updates**: Automatic refresh on transaction confirmation
- **Status Indicators**: Visual badges for negotiation status
- **Role-based Actions**: Different UI for buyers vs sellers
- **Offer Highlighting**: Special visual treatment for offer messages
- **Responsive Design**: Works on desktop and mobile

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query

### Web3
- **Wallet Integration**: RainbowKit + Wagmi
- **Ethereum Library**: Viem
- **Smart Contract Language**: Solidity 0.8.20
- **Development Framework**: Hardhat

### Blockchain
- **Network**: Polygon Amoy Testnet (EVM-compatible)
- **Contract Deployment**: Hardhat scripts
- **Testing**: Hardhat test suite

---

## 📊 User Flow

### Buyer Journey

1. **Connect Wallet** → Connect MetaMask or compatible wallet
2. **Search Domain** → Enter domain name and seller address
3. **Start Negotiation** → Create negotiation with initial offer
4. **Negotiate** → Exchange messages and offers with seller
5. **Wait for Acceptance** → Seller accepts the offer
6. **Deposit Escrow** → Deposit agreed amount into escrow
7. **Receive Domain** → Seller transfers domain off-chain
8. **Release Funds** → Release escrow to seller

### Seller Journey

1. **Connect Wallet** → Connect wallet
2. **View Inbox** → See incoming negotiation requests
3. **Negotiate** → Respond to buyer's messages and offers
4. **Accept Offer** → Accept buyer's final offer
5. **Transfer Domain** → Transfer domain via Doma Protocol
6. **Receive Funds** → Buyer releases escrow

---

## 🔐 Security Features

### Smart Contract Security

- ✅ **Access Control**: Role-based permissions (buyer/seller)
- ✅ **Reentrancy Protection**: Safe transfer patterns
- ✅ **Input Validation**: Require checks on all inputs
- ✅ **Time Locks**: 30-day buyer refund protection
- ✅ **Event Logging**: Complete audit trail

### Future Enhancements

- 🔄 Multi-signature escrow release
- 🔄 Dispute resolution mechanism
- 🔄 Smart contract audits
- 🔄 Rate limiting and spam protection
- 🔄 Oracle integration for domain ownership verification

---

## 📈 Doma Protocol Integration

### Current Integration

- Contract deployment on Doma-supported chain
- Domain name tracking in negotiation
- Escrow mechanism for domain trading

### Future Integration Roadmap

1. **Domain Ownership Verification**
   - Query Doma API to verify seller owns the domain
   - Display domain metadata (registration date, expiry, etc.)

2. **Domain Token Integration**
   - Accept Doma Domain Ownership Tokens as proof
   - Atomic swap: funds released when token transferred

3. **Automated Settlement**
   - Listen for domain token transfer events
   - Automatically release escrow upon confirmation

4. **Domain Fractionalization**
   - Support partial domain ownership negotiations
   - Enable synthetic token trading

---

## 🎨 UI/UX Highlights

### Design Philosophy

- **Simplicity**: Easy to understand, minimal learning curve
- **Familiarity**: Chat-style interface users already know
- **Transparency**: All actions and states clearly visible
- **Speed**: Optimized for fast interactions

### Key UI Components

1. **Home Page**
   - Hero section with clear value proposition
   - Domain search form front and center
   - Feature highlights (messaging, escrow, Doma)

2. **Negotiation Chat** ⭐ Production-Ready
   - Gradient header with key negotiation info
   - Scrollable message history
   - Inline offer displays
   - Action buttons for buyer/seller
   - Real-time message input

3. **Inbox**
   - Card-based layout
   - Status badges
   - Offer amounts highlighted
   - Quick navigation to negotiations

4. **Escrow Panel**
   - Clear action buttons
   - Transaction status
   - Amount displays
   - Refund/release options

---

## 📦 Deployment

### Smart Contracts

Contracts deployed on **Polygon Amoy Testnet**:

```bash
npx hardhat run scripts/deploy.js --network amoy
```

**Expected Output:**
```
Escrow deployed to: 0x...
Negotiation deployed to: 0x...
```

### Frontend

**Vercel Deployment** (Recommended):
```bash
npm run build
vercel --prod
```

**Environment Variables Required:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CHAIN_ID`

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Wallet connection works
- [ ] Start negotiation creates on-chain transaction
- [ ] Messages sent appear in chat
- [ ] Offers are highlighted in UI
- [ ] Seller can accept/reject
- [ ] Escrow deposit works
- [ ] Funds can be released
- [ ] Refund mechanism works
- [ ] Inbox shows all negotiations
- [ ] Dark mode works properly

### Automated Testing (Future)

```bash
npx hardhat test
```

Test coverage to include:
- Negotiation contract functions
- Escrow contract functions
- Edge cases (double spending, unauthorized access)
- Gas optimization tests

---

## 💰 Economics

### Transaction Costs

Average gas costs on Polygon Amoy Testnet:
- Start Negotiation: ~80,000 gas
- Send Message: ~60,000 gas
- Accept Offer: ~50,000 gas
- Deposit Escrow: ~70,000 gas
- Release Funds: ~50,000 gas

### Fee Structure (Future)

Potential revenue models:
- Platform fee (0.5-1% of transaction value)
- Premium features (priority listing, analytics)
- Subscription for high-volume traders

---

## 🗺️ Roadmap

### Phase 1: MVP (Current) ✅

- [x] Smart contracts (Negotiation + Escrow)
- [x] Wallet integration
- [x] Basic UI (Home, Inbox, Negotiation)
- [x] Production-ready Negotiation Chat
- [x] Contract deployment

### Phase 2: Doma Integration 🔄

- [ ] Doma API integration for domain verification
- [ ] Domain Ownership Token support
- [ ] Automated settlement on domain transfer
- [ ] Domain metadata display

### Phase 3: Enhanced Features 🔮

- [ ] Dispute resolution
- [ ] Multi-signature escrow
- [ ] Bulk negotiations
- [ ] Analytics dashboard
- [ ] Notification system

### Phase 4: Production Launch 🚀

- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Marketing campaign
- [ ] Partnership with registrars
- [ ] Mobile app

---

## 👥 Team & Contact

### Project Lead
- **GitHub**: [Your GitHub]
- **Twitter**: [Your Twitter]
- **Email**: [Your Email]

### Acknowledgments

Special thanks to:
- Doma Protocol team for the hackathon
- RainbowKit for wallet connection UI
- Hardhat for development tooling
- Polygon for testnet infrastructure

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🙏 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📚 Resources

- [Doma Protocol Docs](https://docs.doma.com)
- [Project Repository](https://github.com/...)
- [Live Demo](https://krine.vercel.app)
- [Video Demo](https://youtube.com/...)

---

**Built with ❤️ for the Doma Protocol Hackathon**
