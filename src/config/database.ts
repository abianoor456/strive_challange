import mongoose from 'mongoose';
import { guard } from '@utils/error';
import dotenv from 'dotenv';
dotenv.config();


const MONGO_URI = process.env.MONGODB_URI || '';

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB:', MONGO_URI);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        guard.internalServer('Failed to connect to the database');
    }
};
