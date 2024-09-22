const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const MONGODB_URI = 'mongodb://localhost:27017/user_address_db';

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
