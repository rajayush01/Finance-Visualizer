import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
});

// Create or update budget
router.post('/', async (req, res) => {
  try {
    const { category, amount } = req.body;
    
    if (!category || !amount) {
      return res.status(400).json({ error: 'Category and amount are required' });
    }

    const existing = await Budget.findOne({ category });
    if (existing) {
      existing.amount = amount;
      await existing.save();
    } else {
      await new Budget({ category, amount }).save();
    }
    
    const updated = await Budget.find();
    res.json(updated);
  } catch (error) {
    console.error('Error creating/updating budget:', error);
    res.status(400).json({ error: 'Failed to create/update budget' });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Budget.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ error: 'Failed to delete budget' });
  }
});

export default router;