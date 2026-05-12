'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SpendingByCategory } from '@/lib/types';

export default function CategoryBreakdown({ data }: { data: SpendingByCategory[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="category"
            cx="50%" cy="50%" outerRadius={90} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value !== undefined && typeof value === 'number' ? `$${value.toFixed(2)}` : ''} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
