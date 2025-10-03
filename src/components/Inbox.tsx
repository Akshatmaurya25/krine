'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { NEGOTIATION_ABI, NegotiationStatus } from '@/lib/contracts/negotiation';
import { CONTRACTS } from '@/lib/contracts/config';
import Link from 'next/link';

export function Inbox() {
  const { address } = useAccount();

  // Get user negotiations
  const { data: negotiationIds } = useReadContract({
    address: CONTRACTS.NEGOTIATION,
    abi: NEGOTIATION_ABI,
    functionName: 'getUserNegotiations',
    args: address ? [address] : undefined,
  }) as { data: bigint[] | undefined };

  if (!address) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400">
          Please connect your wallet to view negotiations
        </p>
      </div>
    );
  }

  if (!negotiationIds || negotiationIds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          No negotiations found
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Start a Negotiation
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Your Negotiations ({negotiationIds.length})
      </h2>
      <div className="grid gap-4">
        {negotiationIds.map((id) => (
          <NegotiationCard key={id.toString()} negotiationId={id} userAddress={address} />
        ))}
      </div>
    </div>
  );
}

function NegotiationCard({ negotiationId, userAddress }: { negotiationId: bigint; userAddress: string }) {
  const { data: negotiationData } = useReadContract({
    address: CONTRACTS.NEGOTIATION,
    abi: NEGOTIATION_ABI,
    functionName: 'getNegotiation',
    args: [negotiationId],
  });

  if (!negotiationData) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 animate-pulse">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
      </div>
    );
  }

  const [id, buyer, seller, domain, initialOffer, currentOffer, status, createdAt, updatedAt] = negotiationData;

  if (!buyer || !seller || !domain) {
    return null;
  }

  const isBuyer = userAddress.toLowerCase() === buyer.toLowerCase();

  const getStatusBadge = (status: number) => {
    const badges = {
      [NegotiationStatus.Active]: { text: 'Active', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      [NegotiationStatus.Accepted]: { text: 'Accepted', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      [NegotiationStatus.Rejected]: { text: 'Rejected', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      [NegotiationStatus.Closed]: { text: 'Closed', class: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200' },
    };
    const badge = badges[status] || { text: 'Unknown', class: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200' };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}>
        {badge.text}
      </span>
    );
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Link href={`/negotiation/${id.toString()}`}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {domain}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {isBuyer ? 'Buying from' : 'Selling to'}{' '}
              <span className="font-mono">{formatAddress(isBuyer ? seller : buyer)}</span>
            </p>
          </div>
          {getStatusBadge(Number(status))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Initial Offer</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {initialOffer ? formatEther(initialOffer) : '0'} MATIC
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Current Offer</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {currentOffer ? formatEther(currentOffer) : '0'} MATIC
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Last updated: {updatedAt ? new Date(Number(updatedAt) * 1000).toLocaleString() : 'Unknown'}
          </p>
        </div>
      </div>
    </Link>
  );
}
