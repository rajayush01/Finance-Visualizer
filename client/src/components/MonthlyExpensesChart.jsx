import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyExpensesChart = ({ transactions }) => {
  const monthly = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7); // 'YYYY-MM'
    acc[month] = (acc[month] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const data = Object.entries(monthly).map(([month, value]) => ({ month, value }));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Monthly Expenses
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)" 
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;