'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { ESCROW_ABI } from '@/lib/contracts/escrow';
import { CONTRACTS } from '@/lib/contracts/config';

interface EscrowActionsProps {
  negotiationId: bigint;
  seller: string;
  domain: string;
  currentOffer: bigint;
}

export function EscrowActions({ negotiationId, seller, domain, currentOffer }: EscrowActionsProps) {
  const { address } = useAccount();
  const [escrowId, setEscrowId] = useState<bigint | null>(null);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Fetch escrow details if escrowId is set
  const { data: escrowData, refetch } = useReadContract({
    address: CONTRACTS.ESCROW,
    abi: ESCROW_ABI,
    functionName: 'getEscrow',
    args: escrowId !== null ? [escrowId] : undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleDeposit = () => {
    writeContract({
      address: CONTRACTS.ESCROW,
      abi: ESCROW_ABI,
      functionName: 'deposit',
      args: [seller as `0x${string}`, domain],
      value: currentOffer,
    });
  };

  const handleRelease = () => {
    if (escrowId !== null) {
      writeContract({
        address: CONTRACTS.ESCROW,
        abi: ESCROW_ABI,
        functionName: 'release',
        args: [escrowId],
      });
    }
  };

  const handleRefund = () => {
    if (escrowId !== null) {
      writeContract({
        address: CONTRACTS.ESCROW,
        abi: ESCROW_ABI,
        functionName: 'refund',
        args: [escrowId],
      });
    }
  };

  const isBuyer = address?.toLowerCase() === (escrowData?.[0] as string)?.toLowerCase();
  const isSeller = address?.toLowerCase() === (escrowData?.[1] as string)?.toLowerCase();
  const isReleased = escrowData?.[4] as boolean;
  const isRefunded = escrowData?.[5] as boolean;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
        Escrow Actions
      </h2>

      {!escrowData || (!isReleased && !isRefunded) ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
              <span className="font-semibold">Next Step:</span> Buyer deposits funds into escrow
            </p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
              Amount: {currentOffer ? formatEther(currentOffer) : '0'} MATIC
            </p>
          </div>

          <button
            onClick={handleDeposit}
            disabled={isPending || isConfirming || !currentOffer}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isPending || isConfirming ? 'Processing...' : `Deposit ${currentOffer ? formatEther(currentOffer) : '0'} MATIC`}
          </button>

          {escrowData && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                  Escrow Details
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Escrow ID: <span className="font-mono">{escrowId?.toString() || 'N/A'}</span>
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Domain: <span className="font-semibold">{(escrowData[2] as string) || 'Unknown'}</span>
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Amount: <span className="font-semibold">{escrowData[3] ? formatEther(escrowData[3] as bigint) : '0'} MATIC</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {isBuyer && (
                  <button
                    onClick={handleRelease}
                    disabled={isPending || isConfirming}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {isPending || isConfirming ? 'Processing...' : 'Release to Seller'}
                  </button>
                )}
                <button
                  onClick={handleRefund}
                  disabled={isPending || isConfirming}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {isPending || isConfirming ? 'Processing...' : 'Request Refund'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`p-4 rounded-lg ${
          isReleased
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
        }`}>
          <p className="text-sm font-semibold mb-2">
            {isReleased ? '✓ Funds Released' : '↩ Funds Refunded'}
          </p>
          <p className="text-sm">
            {isReleased
              ? 'The escrow funds have been released to the seller.'
              : 'The escrow funds have been refunded to the buyer.'}
          </p>
        </div>
      )}

      {/* Manual Escrow ID Input */}
      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Or enter existing Escrow ID:
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Escrow ID"
            onChange={(e) => setEscrowId(e.target.value ? BigInt(e.target.value) : null)}
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
