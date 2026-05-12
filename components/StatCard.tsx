interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

export default function StatCard({ label, value, sub, color = 'blue' }: StatCardProps) {
  const colors: Record<string, string> = {
    blue:   'text-blue-600',
    red:    'text-red-500',
    green:  'text-green-500',
    orange: 'text-orange-500',
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${colors[color] || colors.blue}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
