import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add a transaction
router.post('/', async (req, res) => {
  try {
    const tx = new Transaction(req.body);
    await tx.save();
    res.status(201).json(tx);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(400).json({ error: 'Failed to create transaction' });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ error: 'Failed to update transaction' });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

export default router;