import { Calendar, TrendingUp, Wallet } from 'lucide-react';

const SummaryCards = ({ transactions }) => {
  const total = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  const latest = transactions.slice(0, 3);
  const byCategory = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200/50 p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Total Expenses</h3>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">₹{total.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-green-200/50 p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Top Category</h3>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xl font-bold text-gray-900">{topCategory ? `${topCategory[0]}` : 'N/A'}</p>
          <p className="text-sm text-gray-600">{topCategory ? `₹${topCategory[1]}` : ''}</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl shadow-lg border border-purple-200/50 p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
          <div className="space-y-1">
            {latest.map(tx => (
              <div key={tx._id} className="text-sm text-gray-700">
                {tx.date} - ₹{tx.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;