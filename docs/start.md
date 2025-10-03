```markdown
# Krine – On-Chain Domain Negotiation Platform

**Context**:  
We are building **Krine**, an on-chain messaging and negotiation platform for domain trading, powered by **Doma**. The platform enables secure negotiations between buyers and sellers with **smart contract escrow** and **automated settlement**. This is for a **hackathon MVP**, so focus on shipping something functional quickly.

I already have a **basic Next.js + Tailwind setup**.  
⚠️ **Do not change or bloat my Tailwind setup unnecessarily.**

---

## 🎯 Goal

- Deliver a working MVP fast.  
- Provide **end-to-end flow**:  
  1. Buyer finds a domain owner.  
  2. Buyer initiates negotiation.  
  3. On-chain messaging (simple inbox).  
  4. Buyer deposits funds into escrow.  
  5. Escrow settles to seller once domain is transferred.

---

## ✅ MVP Scope

**Must-have:**
- Wallet connection (Wagmi + RainbowKit).
- Basic UI pages:
  - **Home** → connect wallet, search domain.
  - **Domain Page** → see owner, start negotiation.
  - **Inbox** → active/completed negotiations.
  - **Negotiation view** → message thread.
  - **Escrow** → deposit, release, refund.
- Smart contracts:
  - `Negotiation.sol` – handle negotiation + messaging.
  - `Escrow.sol` – handle fund deposits & releases.
- Doma integration (check domain ownership).

**Not needed for MVP:** reputation system, dispute resolution, auctions.

---

## 🛠 Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind (already setup).  
- **Web3**: Wagmi + RainbowKit.  
- **Contracts**: Solidity, Hardhat.  
- **Chain**: EVM-compatible (Polygon or Doma-supported).  

---

## 📂 Project Structure

```

/krine
/contracts
Escrow.sol
Negotiation.sol
/frontend
/components
WalletConnect.tsx
Inbox.tsx
Negotiation.tsx
Escrow.tsx
/pages
index.tsx
inbox.tsx
negotiation/[id].tsx
/scripts
deploy.js
hardhat.config.js

```

---

## ⚡ Smart Contracts

### Escrow.sol (MVP)
- `deposit(buyer, seller, domain, amount)` → locks funds.  
- `release(buyer, seller, domain)` → releases funds after domain transfer.  
- `refund(buyer)` → fallback if deal canceled.

### Negotiation.sol (MVP)
- `startNegotiation(buyer, seller, domain, initialOffer)`  
- `sendMessage(negotiationId, sender, message)` → logs events for chat.  
- `acceptOffer(negotiationId, amount)` → triggers escrow deposit.  
- `closeNegotiation(negotiationId)`  

---

## 🎨 UI Flow

1. **Home** → connect wallet, search domain.  
2. **Domain page** → show domain owner, initiate negotiation.  
3. **Inbox** → negotiations list.  
4. **Negotiation view** → threaded messages.  
5. **Escrow actions** → deposit / release / refund.  

---

## 📌 Instructions for Claude

1. Write the smart contracts (`Escrow.sol`, `Negotiation.sol`) first with minimal logic.  
2. Generate simple deployment script (`deploy.js`) using Hardhat.  
3. In the frontend:  
   - Keep Tailwind as-is.  
   - Add wallet connection with RainbowKit.  
   - Create components: WalletConnect, Inbox, Negotiation, Escrow.  
   - Use Wagmi hooks to call contracts.  
4. Implement message sending with events (store messages in contract + fetch via Wagmi).  
5. Make sure escrow actions connect to the negotiation contract.  
6. Keep code **clean, minimal, and hackathon-ready**.

---

## 🚀 Hackathon Strategy

- Show working demo: buyer → seller → negotiation → escrow → settlement.  
- Don’t over-engineer, just make the happy path flow.  
- Make everything modular for later polish.

---
```

