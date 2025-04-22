const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// @route   GET /api/portfolios
// @desc    Get all portfolios for the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id });
    res.json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolios/:username
// @desc    Get public portfolio by username
router.get('/:username', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ username: req.params.username, isPublic: true })
      .populate('user', 'username email');
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/portfolios
// @desc    Create a new portfolio
router.post('/', protect, async (req, res) => {
  try {
    const portfolio = new Portfolio({
      ...req.body,
      user: req.user.id
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/portfolios/:id
// @desc    Update a portfolio
router.put('/:id', protect, async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if user owns the portfolio
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/portfolios/:id
// @desc    Delete a portfolio
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if user owns the portfolio
    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 