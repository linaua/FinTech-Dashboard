'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { MonthlySpending } from '@/lib/types';

export default function SpendingChart({ data }: { data: MonthlySpending[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }}
            tickFormatter={(v: number) => `$${v.toLocaleString()}`} />
          <Tooltip formatter={(value: any) => {
            const amount = typeof value === 'number' ? value : Number(value || 0);
            return [`$${amount.toFixed(2)}`, 'Spent'];
          }} />
          <Line type="monotone" dataKey="total" stroke="#3B82F6"
            strokeWidth={2} dot={{ fill: '#3B82F6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
