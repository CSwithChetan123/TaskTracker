const express = require('express');
const router = express.Router();
const path = require('path');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const authMiddleware = require('./authMiddleware');


router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, dueDate, priority, category, completed } = req.body;
        const task = new Task({ title, description, dueDate, priority, category, completed, user: req.user.id });
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating task');
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tasks');
    }
});

router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority, category, completed } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, description, dueDate, priority, category, completed, user: req.user.id }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating task');
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id, { user: req.user.id });
        res.status(200).send('Task deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting task');
    }
});

module.exports = router;