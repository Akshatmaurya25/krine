export const CONTRACTS = {
  NEGOTIATION: process.env.NEXT_PUBLIC_NEGOTIATION_CONTRACT_ADDRESS as `0x${string}` || '0x',
  ESCROW: process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS as `0x${string}` || '0x',
} as const;

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '80002', 10);
