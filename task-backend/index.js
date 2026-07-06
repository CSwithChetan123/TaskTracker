require('dns').setServers(['8.8.8.8', '8.8.4.4']);

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const dbUrl = process.env.MONGO_DB_URL;
const Task = require('./models/Task');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

main()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl)
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);



// Root route redirect to listings
app.get('/', (req, res) => {
    res.send("Hello world, building MERN stack project");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});