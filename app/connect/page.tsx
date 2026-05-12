'use client';
import { useRouter } from 'next/navigation';
import PlaidLinkButton from '@/components/PlaidLink';

export default function ConnectPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900
                     to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-5xl mb-4">🏦</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Bank</h1>
        <p className="text-gray-500 text-sm mb-6">
          Securely connect via Plaid to see your spending analytics.
        </p>
        <PlaidLinkButton
          userId="demo-user"
          onSuccess={() => router.push('/dashboard')} />
        <p className="text-xs text-gray-400 mt-4">
          Use Plaid Sandbox credentials for testing. No real bank data required.
        </p>
      </div>
    </main>
  );
}
