import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900
                     to-blue-900 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-xl">
        <div className="text-6xl mb-6">📊</div>
        <h1 className="text-5xl font-bold mb-4">FinTrack</h1>
        <p className="text-xl text-white/70 mb-8">
          Personal finance dashboard powered by Plaid.
          Track spending, analyze categories, spot trends.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/connect"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3
                       rounded-xl font-semibold transition">
            Get Started
          </Link>
          <Link href="/dashboard"
            className="border border-white/30 hover:border-white/60
                       px-6 py-3 rounded-xl font-semibold transition">
            View Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
