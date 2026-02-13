import { salt_rounds } from "../env.js";
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';

export const getAllAmeers = async (req, res) => {
    try {
        const ameers = await User.find({ role: /^ameer$/i }).select("-password -resetPasswordToken -resetPasswordExpires");
        if(ameers.length === 0) return res.status(404).json({ success: false, message: "No ameers found." });
        
        return res.status(200).json({
            success: true,
            ameers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const addAmeer = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "No data received in request body" });
    }
    try {
        const { name, email, password, country, mobile } = req.body;
        if (!name || !email || !password || !country || !mobile) return res.status(400).json({ message: "Fields are required." });
        const existingAmeer = await User.findOne({ email });
        if (existingAmeer) return res.status(400).json({ message: "Ameer with this email already exists." });
        const hashPassword = await bcrypt.hash(password, salt_rounds);

        const ameer = new User({
            name,
            email,
            password: hashPassword,
            role: "ameer",
            designation: "ameer",
            country,
            mobile
        });
        await ameer.save();
        return res.status(201).json({
            success: true,
            ameer
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const editAmeer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, designation, country, mobile } = req.body;
        if (!name || !email || !designation || !country || !mobile) return res.status(400).json({ message: "Fields are required." });
        const ameer = await User.findOneAndUpdate(
            { _id: id, role: "ameer" },
            {
                name,
                email,
                designation,
                country,
                mobile
            },
            { new: true, runValidators: true }
        );
        if (!ameer) return res.status(404).json({ success: false, message: "Ameer not found." });
        return res.status(200).json({
            success: true,
            ameer
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteAmeer = async (req, res) => {
    try {
        const { id } = req.params;
        const ameer = await User.findOneAndDelete({ _id: id, role: "ameer" });
        if (!ameer) return res.status(404).json({ success: false, message: "Ameer not found." });
        return res.status(200).json({
            success: true,
            message: "Ameer deleted successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}