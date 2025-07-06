import { useEffect, useState } from 'react';
import { fetchTransactions, fetchBudgets } from './utils/api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategorySummary from './components/CategorySummary';
import BudgetTracker from './components/BudgetTracker';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import SummaryCards from './components/SummaryCard';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const [transactionsData, budgetsData] = await Promise.all([
          fetchTransactions(),
          fetchBudgets()
        ]);
        setTransactions(transactionsData);
        setBudgets(budgetsData);
      } catch (err) {
        setError(err.message);
        console.error('Error initializing app:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading your finances...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl relative z-10">
          <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-pink-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold tracking-tight text-center bg-gradient-to-br from-black via-blue-500 to-black bg-clip-text text-transparent drop-shadow-md mb-4">
  Personal Finance Visualizer
</h1>
          <p className="text-gray-600 text-lg">Track, analyze, and optimize your financial journey</p>
        </div>
        
        <TransactionForm 
          setTransactions={setTransactions} 
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
        />
        
        <SummaryCards transactions={transactions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategorySummary transactions={transactions} />
          <MonthlyExpensesChart transactions={transactions} />
        </div>
        
        <BudgetTracker 
          budgets={budgets} 
          transactions={transactions} 
          setBudgets={setBudgets} 
        />
        
        <TransactionList 
          transactions={transactions} 
          setTransactions={setTransactions}
          setEditingTransaction={setEditingTransaction}
        />
      </div>
    </div>
  );
};

export default App;
