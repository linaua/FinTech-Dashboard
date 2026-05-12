'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction, SpendingByCategory, MonthlySpending } from '@/lib/types';
import StatCard           from '@/components/StatCard';
import SpendingChart      from '@/components/SpendingChart';
import CategoryBreakdown  from '@/components/CategoryBreakdown';
import TransactionList    from '@/components/TransactionList';

const CATEGORY_COLORS = [
  '#3B82F6','#EF4444','#22C55E','#F97316',
  '#8B5CF6','#EC4899','#EAB308','#06B6D4',
];

function processTransactions(transactions: Transaction[]) {
  const totals = new Map<string, number>();
  const monthly = new Map<string, number>();
  let totalSpent = 0;

  transactions.forEach((t) => {
    if (t.pending || t.amount <= 0) return;
    totalSpent += t.amount;

    const cat = t.category?.[0] ?? 'Other';
    totals.set(cat, (totals.get(cat) ?? 0) + t.amount);

    const month = t.date.substring(0, 7);
    monthly.set(month, (monthly.get(month) ?? 0) + t.amount);
  });

  const categories: SpendingByCategory[] = Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([category, total], i) => ({
      category, total: Math.round(total * 100) / 100,
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));

  const monthlyData: MonthlySpending[] = Array.from(monthly.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({
      month: new Date(month + '-01').toLocaleString('default', {
        month: 'short', year: '2-digit',
      }),
      total: Math.round(total * 100) / 100,
    }));

  return { categories, monthlyData, totalSpent };
}

export default function DashboardPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 'demo-user';

  const loadData = useCallback(async () => {
    setLoading(true);
    const res  = await fetch(`/api/plaid/transactions?userId=${userId}`);
    const data = await res.json();
    if (data.error === 'Not connected') {
      router.push('/connect');
      return;
    }
    setTransactions(data.transactions ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading transactions...</p>
      </div>
    );

  const { categories, monthlyData, totalSpent } = processTransactions(transactions);
  const avgMonthly = monthlyData.length
    ? totalSpent / monthlyData.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">FinTrack Dashboard</h1>
          <button onClick={() => router.push('/connect')}
            className="text-sm text-blue-600 hover:underline">
            Reconnect Bank
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Spent (90d)"
            value={`$${totalSpent.toFixed(2)}`} color="red" />
          <StatCard label="Avg Monthly"
            value={`$${avgMonthly.toFixed(2)}`} color="orange" />
          <StatCard label="Transactions"
            value={String(transactions.filter((t) => !t.pending).length)}
            color="blue" />
          <StatCard label="Categories"
            value={String(categories.length)} color="green" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SpendingChart data={monthlyData} />
          <CategoryBreakdown data={categories} />
        </div>

        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}
