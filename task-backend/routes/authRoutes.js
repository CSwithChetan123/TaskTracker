const express = require('express');
const router = express.Router();
const path = require('path');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Register
router.post('/register', async (req, res) => {
    try {

        const { fullName, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ fullName, email, password: hashedPassword });

        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(user._id);
        res.status(200).json({ token, user });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login    

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
});

// Get

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
});

//Delete

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
});

//Update

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, { fullName, email, password }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
});

//Get by ID

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
});

module.exports = router;    