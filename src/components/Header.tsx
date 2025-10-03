import Link from 'next/link';
import Image from 'next/image';
import { WalletConnect } from './WalletConnect';

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo_withoutbg_withoutsidespace.svg"
            alt="Krine Logo"
            width={40}
            height={40}
            className="transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Krine
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              On-Chain Domain Negotiation
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/inbox"
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">Inbox</span>
          </Link>
          <WalletConnect />
        </nav>
      </div>
    </header>
  );
}
