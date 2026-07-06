// getting-started.js
const mongoose = require('mongoose');
const mongoDbUrl = process.env.MONGO_DB_URL;

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongoDbUrl);

}