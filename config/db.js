import mongoose from "mongoose";
import { mongodb_uri } from '../env.js';

const connectDB = async () => {
    try {
        mongoose.connect(mongodb_uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;