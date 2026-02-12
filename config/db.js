import mongoose from "mongoose";
import { ADMIN_EMAIL, ADMIN_PASSWORD, mongodb_uri, salt_rounds } from '../env.js';
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';


const seedAdmin = async () => {
    try {
        const adminEmail = ADMIN_EMAIL;
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            // Hash the password before saving!
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt_rounds);

            await User.create({
                name: "System Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
                permissions: "create"
            });
            console.log("✅ Default admin user created.");
        } else {
            console.log("ℹ️ Admin user already exists. Skipping seed.");
        }
    } catch (err) {
        console.error("❌ Error seeding admin:", err.message);
    }
};

const connectDB = async () => {
    try {
        mongoose.connect(mongodb_uri);
        console.log("MongoDB connected successfully");
        await seedAdmin();
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;