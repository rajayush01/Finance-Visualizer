import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  date: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Misc']
  },
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema);