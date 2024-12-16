import mongoose from 'mongoose';
import { guard } from '@utils/error';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'strive';

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        console.log('Connected to MongoDB:', `${MONGODB_URI}/${DB_NAME}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        guard.internalServer('Failed to connect to the database');
    }
};
