import { Transaction } from '@/lib/types';

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.slice(0, 20).map((t) => (
          <div key={t.transaction_id}
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-800">
                {t.merchant_name || t.name}
              </p>
              <p className="text-xs text-gray-400">
                {t.category?.[0] ?? 'Uncategorized'} · {t.date}
              </p>
            </div>
            <span className={`text-sm font-semibold ${
              t.amount > 0 ? 'text-red-500' : 'text-green-500'
            }`}>
              {t.amount > 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
