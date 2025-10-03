import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { Inbox } from '@/components/Inbox';

export default function InboxPage() {
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
              className="text-blue-600 dark:text-blue-400 font-semibold"
            >
              Inbox
            </Link>
            <WalletConnect />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Inbox />
      </main>
    </div>
  );
}
