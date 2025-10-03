'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { NEGOTIATION_ABI, NegotiationStatus } from '@/lib/contracts/negotiation';
import { CONTRACTS } from '@/lib/contracts/config';

interface Message {
  sender: string;
  content: string;
  timestamp: bigint;
  offerAmount: bigint;
}

interface NegotiationData {
  id: bigint;
  buyer: string;
  seller: string;
  domain: string;
  initialOffer: bigint;
  currentOffer: bigint;
  status: NegotiationStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export function NegotiationChat({ negotiationId }: { negotiationId: bigint }) {
  const { address } = useAccount();
  const [messageInput, setMessageInput] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [isOffer, setIsOffer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // Fetch negotiation data
  const { data: rawNegotiationData, refetch: refetchNegotiation, error: negotiationError, isLoading: isLoadingNegotiation } = useReadContract({
    address: CONTRACTS.NEGOTIATION,
    abi: NEGOTIATION_ABI,
    functionName: 'getNegotiation',
    args: [negotiationId],
  });

  // Transform tuple to object
  const negotiationData: NegotiationData | undefined = rawNegotiationData
    ? {
        id: rawNegotiationData[0] as bigint,
        buyer: rawNegotiationData[1] as string,
        seller: rawNegotiationData[2] as string,
        domain: rawNegotiationData[3] as string,
        initialOffer: rawNegotiationData[4] as bigint,
        currentOffer: rawNegotiationData[5] as bigint,
        status: rawNegotiationData[6] as NegotiationStatus,
        createdAt: rawNegotiationData[7] as bigint,
        updatedAt: rawNegotiationData[8] as bigint,
      }
    : undefined;

  // Debug logging
  useEffect(() => {
    console.log('Negotiation ID:', negotiationId.toString());
    console.log('Raw negotiation data:', rawNegotiationData);
    console.log('Transformed negotiation data:', negotiationData);
  }, [negotiationId, rawNegotiationData, negotiationData]);

  // Fetch messages
  const { data: messages, refetch: refetchMessages } = useReadContract({
    address: CONTRACTS.NEGOTIATION,
    abi: NEGOTIATION_ABI,
    functionName: 'getMessages',
    args: [negotiationId],
  }) as { data: Message[] | undefined; refetch: () => void };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Refetch on transaction confirmation
  useEffect(() => {
    if (!isConfirming && hash) {
      refetchNegotiation();
      refetchMessages();
    }
  }, [isConfirming, hash, refetchNegotiation, refetchMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && !isOffer) return;

    const offerValue = isOffer && offerAmount ? parseEther(offerAmount) : BigInt(0);

    writeContract({
      address: CONTRACTS.NEGOTIATION,
      abi: NEGOTIATION_ABI,
      functionName: 'sendMessage',
      args: [negotiationId, messageInput || `New offer: ${offerAmount} MATIC`, offerValue],
    });

    setMessageInput('');
    setOfferAmount('');
    setIsOffer(false);
  };

  const handleAcceptOffer = () => {
    writeContract({
      address: CONTRACTS.NEGOTIATION,
      abi: NEGOTIATION_ABI,
      functionName: 'acceptOffer',
      args: [negotiationId],
    });
  };

  const handleCloseNegotiation = (rejected: boolean) => {
    writeContract({
      address: CONTRACTS.NEGOTIATION,
      abi: NEGOTIATION_ABI,
      functionName: 'closeNegotiation',
      args: [negotiationId, rejected],
    });
  };

  const formatAddress = (addr?: string) => {
    if (!addr) return 'Unknown';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestamp?: bigint) => {
    if (!timestamp) return '';
    try {
      return new Date(Number(timestamp) * 1000).toLocaleString();
    } catch {
      return '';
    }
  };

  const getStatusBadge = (status: NegotiationStatus) => {
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

  if (negotiationError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500 dark:text-red-400 font-semibold">Error loading negotiation</div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md text-center">
          {negotiationError.message}
        </div>
        <button
          onClick={() => refetchNegotiation()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoadingNegotiation || !negotiationData || !negotiationData.buyer || !negotiationData.seller) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <div className="text-zinc-500 dark:text-zinc-400">
          {isLoadingNegotiation ? 'Loading negotiation...' : 'Processing data...'}
        </div>
      </div>
    );
  }

  const isBuyer = address?.toLowerCase() === negotiationData.buyer.toLowerCase();
  const isSeller = address?.toLowerCase() === negotiationData.seller.toLowerCase();
  const isActive = negotiationData.status === NegotiationStatus.Active;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">{negotiationData.domain || 'Unknown Domain'}</h1>
          {negotiationData.status !== undefined && getStatusBadge(negotiationData.status)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="opacity-80">Buyer:</span>
            <div className="font-mono font-semibold">
              {formatAddress(negotiationData.buyer)}
              {isBuyer && <span className="ml-2 text-xs">(You)</span>}
            </div>
          </div>
          <div>
            <span className="opacity-80">Seller:</span>
            <div className="font-mono font-semibold">
              {formatAddress(negotiationData.seller)}
              {isSeller && <span className="ml-2 text-xs">(You)</span>}
            </div>
          </div>
          <div>
            <span className="opacity-80">Current Offer:</span>
            <div className="text-xl font-bold">
              {negotiationData.currentOffer ? formatEther(negotiationData.currentOffer) : '0'} MATIC
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50 dark:bg-zinc-950">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => {
            if (!message || !message.sender) return null;

            const isCurrentUser = address?.toLowerCase() === message.sender.toLowerCase();
            const hasOffer = message.offerAmount && message.offerAmount > BigInt(0);

            return (
              <div
                key={index}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    isCurrentUser
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs opacity-70 font-mono">
                      {formatAddress(message.sender)}
                    </span>
                    {hasOffer && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isCurrentUser ? 'bg-blue-500' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        Offer: {formatEther(message.offerAmount)} MATIC
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{message.content || ''}</p>
                  <p className={`text-xs mt-2 opacity-60`}>
                    {message.timestamp ? formatTimestamp(message.timestamp) : ''}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-zinc-500 dark:text-zinc-400 mt-8">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons (for seller) */}
      {isActive && isSeller && (
        <div className="px-6 py-3 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 flex gap-3">
          <button
            onClick={handleAcceptOffer}
            disabled={isPending || isConfirming}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isPending || isConfirming ? 'Processing...' : 'Accept Offer'}
          </button>
          <button
            onClick={() => handleCloseNegotiation(true)}
            disabled={isPending || isConfirming}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reject
          </button>
        </div>
      )}

      {/* Message Input */}
      {isActive && (isBuyer || isSeller) ? (
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOffer}
                  onChange={(e) => setIsOffer(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Include Offer
                </span>
              </label>
              {isOffer && (
                <input
                  type="number"
                  step="0.001"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-32 px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                  required={isOffer}
                />
              )}
              {isOffer && <span className="text-sm text-zinc-500 dark:text-zinc-400">MATIC</span>}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isOffer}
              />
              <button
                type="submit"
                disabled={isPending || isConfirming || (!messageInput.trim() && !isOffer)}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {isPending || isConfirming ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800 text-center text-zinc-600 dark:text-zinc-400">
          {!isActive ? 'This negotiation is no longer active' : 'You are not a participant in this negotiation'}
        </div>
      )}
    </div>
  );
}
