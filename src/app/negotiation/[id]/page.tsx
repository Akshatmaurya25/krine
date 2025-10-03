import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { NegotiationChat } from '@/components/NegotiationChat';
import { EscrowActions } from '@/components/EscrowActions';

export default async function NegotiationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const negotiationId = BigInt(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                Krine
              </h1>
            </Link>
            <span className="text-sm text-zinc-600 dark:text-zinc-400 hidden sm:inline">
              On-Chain Domain Negotiation
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/inbox"
              className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Inbox
            </Link>
            <WalletConnect />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NegotiationChat negotiationId={negotiationId} />
          </div>
          <div className="lg:col-span-1">
            <NegotiationDetailsPanel negotiationId={negotiationId} />
          </div>
        </div>
      </main>
    </div>
  );
}

function NegotiationDetailsPanel({ negotiationId }: { negotiationId: bigint }) {
  return (
    <div className="space-y-6">
      {/* Placeholder - will populate with actual data */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Negotiation Info
        </h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-zinc-500 dark:text-zinc-400">Negotiation ID</p>
            <p className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
              {negotiationId.toString()}
            </p>
          </div>
        </div>
      </div>

      {/* Escrow component - placeholder, will be enhanced with actual negotiation data */}
      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
        <p>Escrow actions available after offer is accepted</p>
      </div>
    </div>
  );
}
