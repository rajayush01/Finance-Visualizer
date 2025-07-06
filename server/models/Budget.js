import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Misc']
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
}, {
  timestamps: true
});

export default mongoose.model('Budget', budgetSchema);