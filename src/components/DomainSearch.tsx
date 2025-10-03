'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DomainSearch() {
  const [domain, setDomain] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain && sellerAddress) {
      router.push(`/negotiate?domain=${encodeURIComponent(domain)}&seller=${sellerAddress}`);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Start Domain Negotiation
      </h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label
            htmlFor="domain"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Domain Name
          </label>
          <input
            id="domain"
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.io"
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="seller"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Seller Address
          </label>
          <input
            id="seller"
            type="text"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Start Negotiation
        </button>
      </form>
    </div>
  );
}
