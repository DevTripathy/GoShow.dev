import adminModel from '../models/adminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import transporter from '../configs/nodemailer.js';
import Booking from '../models/bookingModel.js';
import Show from '../models/Show.js';
import mongoose from 'mongoose';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required" });
  }

  try {
    const existingAdmin = await adminModel.findOne({ email });

    const adminCount = await adminModel.countDocuments();

    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new adminModel({
        name: "Admin",
        email,
        password: hashedPassword
      });
      await newAdmin.save();

      const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.json({ success: true, message: "Admin account created and logged in successfully" });
    }

    if (!existingAdmin) {
      return res.json({
        success: false,
        message: "Admin not found. You cannot create new admin accounts."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, message: "Admin logged in successfully", isVerified: existingAdmin.isVerified });

  } catch (error) {
    console.error("Admin login error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const adminLogout = (req, res) => {
    try {
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        res.json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendAdminVerificationEmail = async (req, res) => {
    try {
        const { adminId } = req.body;
        const admin = await adminModel.findById(adminId);
        if(!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }
        if(admin.isVerified) {
            return res.json({ success: false, message: "Admin already verified" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        admin.verifyOtp = otp;
        admin.OtpExpiry = Date.now() + 600000; // 10 minutes
        await admin.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: admin.email,
            subject: 'Email Verification - Admin',
            text: `Hello ${admin.name},\n\nYour OTP for email verification is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nGoShow Team`
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "OTP sent to your registered email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const verifyAdminEmail = async (req, res) => {
    const { adminId, otp } = req.body;

    if(!adminId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const admin = await adminModel.findById(adminId);
        if(!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }
        if(admin.verifyOtp !== otp || Date.now() > admin.OtpExpiry) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }

        admin.isVerified = true;
        admin.verifyOtp = '';
        admin.OtpExpiry = 0;
        await admin.save();

        res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendAdminPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if(!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        admin.resetOtp = otp;
        admin.resetOtpExpiry = Date.now() + 600000; // 10 minutes
        await admin.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset - Admin',
            text: `Hello ${admin.name},\n\nYour OTP for password reset is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nGoShow Team`
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const resetAdminPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const admin = await adminModel.findOne({ email });                
        if(!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }
        if(admin.resetOtp !== otp || admin.resetOtp === '') {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if(admin.resetOtpExpiry < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        admin.resetOtp = '';
        admin.resetOtpExpiry = 0;
        await admin.save();

        res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAdminDetails = async (req, res) => {
    try {
        const adminId = req.body.adminId;
        const admin = await adminModel.findById(adminId).select('-password -verifyOtp -OtpExpiry -resetOtp -resetOtpExpiry');  

        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        res.json({ success: true,
          adminData: {
             name: admin.name,
             email: admin.email,
             isVerified: admin.isVerified
          }
         });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const isAdminAuthenticated = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.body.adminId);
        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }
        return res.json({ success: true, isVerified: admin.isVerified });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const bookings = await Booking.find({ isPaid: true });
        const activeShows = await Show.find({ showDateTime: {$gte: new Date()}}).populate('movie');
        const totalUsers = await mongoose.connection.db.collection('users').countDocuments();

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((total, booking) => total + booking.amount, 0),
            activeShows,
            totalUser: totalUsers,
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//API to get all shows
export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: {$gte: new Date()}}).populate('movie').sort({ showDateTime: 1 });
        res.json({ success: true, shows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }   
}

//API to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: 'show',
            populate: { path: 'movie' }
        }).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//API to delete a show
export const deleteShow = async (req, res) => {
    try {
        const { showId } = req.params;

        // Check if show exists
        const show = await Show.findById(showId);
        if (!show) {
            return res.json({ success: false, message: "Show not found" });
        }

        // Check if there are any bookings for this show
        const bookings = await Booking.find({ show: showId });
        if (bookings.length > 0) {
            return res.json({ success: false, message: "Cannot delete show with existing bookings" });
        }

        // Delete the show
        await Show.findByIdAndDelete(showId);

        res.json({ success: true, message: "Show deleted successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}
