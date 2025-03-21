const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @desc    Obtenir toutes les tâches
// @route   GET /api/tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Créer une nouvelle tâche
// @route   POST /api/tasks
// @access  Public
router.post('/', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Le titre de la tâche est requis' });
    }

    const task = await Task.create({
      title: req.body.title
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;