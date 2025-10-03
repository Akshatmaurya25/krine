import { Header } from '@/components/Header';
import { Inbox } from '@/components/Inbox';

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Inbox />
      </main>
    </div>
  );
}
