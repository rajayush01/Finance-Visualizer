import { useState, useEffect } from 'react';
import { createTransaction, updateTransaction } from '../utils/api';
import { Plus, DollarSign, Calendar } from 'lucide-react';

const categories = ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Misc'];

const TransactionForm = ({ setTransactions, editingTransaction, setEditingTransaction }) => {
  const [form, setForm] = useState({ 
    amount: '', 
    date: '', 
    description: '', 
    category: 'Food' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingTransaction) {
      setForm(editingTransaction);
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingTransaction) {
        const updated = await updateTransaction(editingTransaction._id, form);
        setTransactions(prev => prev.map(tx => tx._id === updated._id ? updated : tx));
        setEditingTransaction(null);
      } else {
        const newTx = await createTransaction(form);
        setTransactions(prev => [newTx, ...prev]);
      }
      setForm({ amount: '', date: '', description: '', category: 'Food' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setForm({ amount: '', date: '', description: '', category: 'Food' });
    setError(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Plus className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="number" 
            placeholder="Amount" 
            value={form.amount} 
            onChange={e => setForm({ ...form, amount: e.target.value })} 
            required 
            min="0"
            step="0.01"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input 
            type="date" 
            value={form.date} 
            onChange={e => setForm({ ...form, date: e.target.value })} 
            required 
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
          />
        </div>
        <input 
          type="text" 
          placeholder="Description" 
          value={form.description} 
          onChange={e => setForm({ ...form, description: e.target.value })} 
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
        />
        <select 
          value={form.category} 
          onChange={e => setForm({ ...form, category: e.target.value })} 
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? 'Saving...' : (editingTransaction ? 'Update' : 'Add')}
          </button>
          {editingTransaction && (
            <button 
              type="button"
              onClick={handleCancel}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;