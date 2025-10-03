'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { NEGOTIATION_ABI } from '@/lib/contracts/negotiation';
import { CONTRACTS } from '@/lib/contracts/config';

export function NegotiateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  const domain = searchParams.get('domain');
  const seller = searchParams.get('seller');

  const [initialOffer, setInitialOffer] = useState('');
  const [error, setError] = useState('');

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const isCorrectNetwork = chainId === 80002; // Polygon Amoy

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess && hash) {
      // Navigate to inbox where user can see their negotiations
      const redirect = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/inbox');
      };
      redirect();
    }
  }, [isSuccess, hash, router]);

  const handleInitiateNegotiation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!seller || !domain) {
      setError('Missing domain or seller information');
      return;
    }

    if (!initialOffer || parseFloat(initialOffer) <= 0) {
      setError('Please enter a valid initial offer amount');
      return;
    }

    try {
      const offerValue = parseEther(initialOffer);

      writeContract({
        address: CONTRACTS.NEGOTIATION,
        abi: NEGOTIATION_ABI,
        functionName: 'startNegotiation',
        args: [seller as `0x${string}`, domain, offerValue],
        gas: BigInt(500000), // Explicit gas limit
      });
    } catch (err) {
      console.error('Error initiating negotiation:', err);
      setError('Failed to initiate negotiation');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Start Negotiation
      </h2>

      {domain && seller ? (
        <form onSubmit={handleInitiateNegotiation} className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Domain
            </h3>
            <p className="font-mono text-lg text-blue-700 dark:text-blue-300">
              {domain}
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Seller Address
            </h3>
            <p className="font-mono text-sm text-purple-700 dark:text-purple-300 break-all">
              {seller}
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              Initial Offer
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.001"
                min="0"
                value={initialOffer}
                onChange={(e) => setInitialOffer(e.target.value)}
                placeholder="0.0"
                className="flex-1 px-4 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">MATIC</span>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {writeError && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                Transaction failed
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 font-mono">
                {writeError.message}
              </p>
            </div>
          )}

          {!isConnected && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Please connect your wallet to initiate a negotiation
              </p>
            </div>
          )}

          {isConnected && !isCorrectNetwork && (
            <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">
                Wrong Network
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Please switch to Polygon Amoy Testnet (Chain ID: 80002) in your wallet
              </p>
            </div>
          )}

          {isConnected && balance && parseFloat(balance.formatted) < 0.01 && (
            <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">
                Low Balance
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Your balance is {balance.formatted} {balance.symbol}. You may not have enough for gas fees.
              </p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isConnected || !isCorrectNetwork || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isPending ? 'Confirming...' : 'Processing...'}
                </span>
              ) : (
                'Initiate Negotiation'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Missing required parameters. Please provide both domain and seller address.
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 font-mono">
            Example: /negotiate?domain=example.ai&seller=0x...
          </p>
        </div>
      )}
    </div>
  );
}
