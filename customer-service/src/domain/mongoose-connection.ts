import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export default async function connectToDB() {
    try {
      await mongoose.connect(mongoURI!);
      console.log('Connected to the Database');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    process.exit(1); 
    }
};