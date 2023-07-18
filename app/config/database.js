const mongoose = require('mongoose');


const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connection successful...');
        return connection;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;