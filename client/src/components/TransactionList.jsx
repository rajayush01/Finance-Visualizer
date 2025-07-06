import { deleteTransaction } from '../utils/api';
import { Settings, Edit2, Trash2 } from 'lucide-react';

const TransactionList = ({ transactions, setTransactions, setEditingTransaction }) => {
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter(tx => tx._id !== id));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Transaction History
        </h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map(tx => (
          <div key={tx._id} className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div>
                <p className="font-semibold text-gray-900">{tx.description}</p>
                <p className="text-sm text-gray-600">{tx.date} • {tx.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-gray-900">₹{tx.amount}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(tx)} 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(tx._id)} 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;