const express = require('express');
const router = express.Router();
const path = require('path');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying token');
    }
};