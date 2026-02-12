import jwt from "jsonwebtoken";
import { salt_rounds, jwt_secret, jwt_expires_in, email_user, email_pass } from "../env.js";
import crypto from 'crypto';
import User from "../models/UserModel.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const Signup = async (req, res) => {
    try {
        const { name, designation,  email, country, mobile, password } = req.body;
        if(!name || !email || !password || !designation || !country || !mobile) return res.status(400).json({ message: "Fields are required."});

        const user = await User.findOne({ email });
        if(user) return res.status(400).json({ message: "User already exists."});

        const hashPassword = await bcrypt.hash(password, salt_rounds);
        const newUser = new User({ name, designation, country, email, mobile, password: hashPassword })
        await newUser.save();

        res.status(201).json({ success: true, message: "User created Success."})
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ message: "Email and password are required." });
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "User not registered."});
        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            {id: user.id},
            jwt_secret,
            {expiresIn: jwt_expires_in}
        )

        res.status(200).json({
            messgae: "User login success.",
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found with this email." });

        const resetToken = crypto.randomBytes(32).toString('hex');

        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; 

        await user.save();

        const resetUrl = `http://localhost:8000/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: email_user,
                pass: email_pass
            }
        });

        const mailOptions = {
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click on this link: \n\n ${resetUrl}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset link sent to your email!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const ResetPassword = async (req, res) => {
    try {
        // 1. Get the hashed version of the token from the URL
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        // 2. Find user with matching token AND ensure token hasn't expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() } // $gt means "Greater Than"
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // 3. Set the new password
        // Note: If you have a 'pre-save' hook for hashing in your Schema, 
        // just set user.password = req.body.password.
        // Otherwise, hash it manually here:
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // 4. Clear the reset fields so the token can't be used again
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful! You can now log in." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};