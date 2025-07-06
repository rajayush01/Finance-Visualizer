import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const CategorySummary = ({ transactions }) => {
  const data = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
          <PieChart className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Category Breakdown
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            dataKey="value" 
            data={chartData} 
            cx="50%" 
            cy="50%" 
            outerRadius={100} 
            label
            stroke="none"
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom color legend */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-700 font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
