import React, { useState } from 'react';
import { setCategoryBudget } from '../utils/api';
import { Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BudgetTracker = ({ budgets, transactions, setBudgets }) => {
  const [form, setForm] = useState({ category: 'Food', amount: '' });
  const categories = ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Misc'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await setCategoryBudget(form);
    setBudgets(updated);
    setForm({ category: 'Food', amount: '' });
  };

  const spentByCategory = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const chartData = categories.map(cat => ({
    category: cat,
    budget: budgets.find(b => b.category === cat)?.amount || 0,
    spent: spentByCategory[cat] || 0,
  }));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
          <Target className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Budget Tracker
        </h2>
      </div>

      <div className='flex flex-row justify-between items-center mb-4'>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6">
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          >
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <input
            type="number"
            placeholder="Budget Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Set Budget
          </button>
        </form>
        <div>
          <div className='flex flex-row items-center gap-2'>
            <div className='bg-green-500 p-2'></div>
            <div>Budget</div>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <div className='bg-[#E9970A] p-2'></div>
            <div>Spent</div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="category"
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
          <Bar dataKey="budget" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="spent" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetTracker;
