# Krine Deployment Guide

## Quick Start

### 1. Install Dependencies

Run the installation script:

```bash
# On Unix/Linux/Mac
chmod +x install.sh
./install.sh

# On Windows
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-ethers ethers dotenv
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Then edit `.env` and add:

- **NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID**: Get from https://cloud.walletconnect.com
  1. Sign up for free
  2. Create a new project
  3. Copy the Project ID

- **PRIVATE_KEY**: Your wallet private key for deployment
  - ⚠️ Use a testnet wallet only
  - Get testnet MATIC from https://faucet.polygon.technology

### 3. Get Testnet Tokens

1. Visit https://faucet.polygon.technology
2. Select "Polygon Amoy Testnet"
3. Enter your wallet address
4. Request tokens (you'll receive ~0.5 MATIC)

### 4. Compile Contracts

```bash
npx hardhat compile
```

Expected output:
```
Compiled 2 Solidity files successfully
```

### 5. Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network amoy
```

**Important**: Copy the contract addresses from the output:

```
Escrow deployed to: 0xABC123...
Negotiation deployed to: 0xDEF456...
```

### 6. Update Environment

Add the deployed addresses to your `.env`:

```env
NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS=0xDEF456...
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0xABC123...
```

### 7. Run Application

```bash
npm run dev
```

Open http://localhost:3000

---

## Deployment Options

### Option 1: Polygon Amoy Testnet (Recommended for Testing)

Already configured in `hardhat.config.js`:

```bash
npx hardhat run scripts/deploy.js --network amoy
```

**RPC URL**: https://rpc-amoy.polygon.technology/
**Chain ID**: 80002
**Explorer**: https://amoy.polygonscan.com/

### Option 2: Local Hardhat Network (For Development)

Terminal 1:
```bash
npx hardhat node
```

Terminal 2:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

Update `.env`:
```env
NEXT_PUBLIC_CHAIN_ID=31337
```

### Option 3: Other EVM Networks

Edit `hardhat.config.js` to add your network:

```javascript
networks: {
  yourNetwork: {
    url: "YOUR_RPC_URL",
    accounts: [process.env.PRIVATE_KEY],
    chainId: YOUR_CHAIN_ID,
  },
}
```

---

## Frontend Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Visit https://vercel.com
3. Import repository
4. Add environment variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_CHAIN_ID`
5. Deploy

### Manual Build

```bash
npm run build
npm start
```

---

## Verification

### Verify Contracts on Polygonscan

1. Get API key from https://polygonscan.com/apis
2. Add to `.env`:
   ```env
   POLYGONSCAN_API_KEY=your_api_key
   ```
3. Verify:
   ```bash
   npx hardhat verify --network amoy DEPLOYED_ADDRESS
   ```

### Test the Application

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Start Negotiation**: Enter a domain and seller address
3. **Send Message**: Try sending a message
4. **Make Offer**: Include an offer amount
5. **Check Inbox**: View all negotiations

---

## Troubleshooting

### "Insufficient funds" error
- Get more testnet MATIC from faucet
- Check you're on the correct network

### "Invalid contract address" error
- Verify addresses in `.env` are correct
- Ensure contracts are deployed
- Check you're on the correct network (Chain ID 80002)

### Wallet not connecting
- Install MetaMask
- Add Polygon Amoy network manually:
  - Network Name: Polygon Amoy Testnet
  - RPC URL: https://rpc-amoy.polygon.technology/
  - Chain ID: 80002
  - Currency: MATIC
  - Explorer: https://amoy.polygonscan.com/

### Build errors
- Clear cache: `rm -rf .next node_modules && npm install`
- Check Node version: Should be 18+

---

## Security Checklist

Before deploying to production:

- [ ] Smart contract audit completed
- [ ] All private keys secured
- [ ] Rate limiting implemented
- [ ] Error handling comprehensive
- [ ] Gas optimization done
- [ ] Frontend security review
- [ ] Environment variables secured
- [ ] Domain ownership verification via Doma API

---

## Monitoring

After deployment, monitor:

- Transaction success rates
- Gas costs
- User activity
- Error logs
- Contract events

Use tools like:
- Polygonscan for contract monitoring
- Vercel Analytics for frontend
- Sentry for error tracking

---

## Support

Need help? Check:
- README.md for detailed docs
- NOTION.md for project overview
- GitHub Issues
- Doma Protocol Discord
