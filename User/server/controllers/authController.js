import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import transporter from '../configs/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE, WELCOME_TEMPLATE } from '../configs/emailTemplates.js';

export const userSignUp = async (req, res) => {
    const { fullname, email, password } = req.body;

    if(!fullname || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            fullname,
            email,
            password: hashedPassword
        });
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to GoShow!',
            // text: `Hello ${fullname},\n\nThank you for signing up on GoShow! We're excited to have you with us.\n Book your movie tickets with ease.\n\nBest regards,\nGoShow Team`

            html: WELCOME_TEMPLATE.replace('{{fullname}}', fullname)
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.json({ success: false, message: "Email or Password does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }

        // const isVerified = user.isVerified;
        // if(!isVerified) {
        //     return res.json({ success: false, message: "Email not verified. Please verify your email to login." });
        // } 

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ success: true, message: "User logged in successfully", isVerified: user.isVerified });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const userLogout = (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendVerificationEmail = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if(user.isVerified) {
            return res.json({ success: false, message: "User already verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyOtp = otp;
        user.OtpExpiry = Date.now() + 600000; // 10 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Email Verification - GoShow',
            // text: `Hello ${user.fullname},\n\nYour OTP for email verification is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nGoShow Team`
            html: EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "OTP sent to your registered email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;

    if(!otp) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findById(userId);
        if(!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if(user.OtpExpiry < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        if( user.isVerified ) {
            return res.json({ success: false, message: "User already verified" });
        }

        user.isVerified = true;
        
        user.verifyOtp = '';
        user.OtpExpiry = 0;
        await user.save();

        res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 600000; // 10 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset - GoShow',
            // text: `Hello ${user.fullname},\n\nYour OTP for password reset is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nGoShow Team`
            html: PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const user = await userModel.findOne({ email });                
        if(!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if(user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if(user.resetOtpExpiry < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiry = 0;
        await user.save();

        res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}