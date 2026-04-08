import express from 'express';
import Booking from '../models/Booking.js';
import userModel from '../models/userModel.js';


//API controller function to get user booking
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.userId;
        const bookings = await Booking.find({ user: userId }).populate({
            path: 'show',
            populate: { path: 'movie' }
        }).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

//API controller function to get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

//API controller function to update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullname, profilePhoto, address } = req.body;
        const updatedData = { fullname, profilePhoto, address };

        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password -verifyOtp -OtpExpiry -resetOtp -resetOtpExpiry');
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getUserDetails = async (req, res) => {
   try {
       const userId = req.userId;
       const user = await userModel.findById(userId).select('-password -verifyOtp -OtpExpiry -resetOtp -resetOtpExpiry');

       if (!user) {
           return res.json({ success: false, message: "User not found" });
       }

       res.json({ success: true,
         user: {
            fullname: user.fullname,
            isVerified: user.isVerified,
            profilePhoto: user.profilePhoto,
            address: user.address
         }
        });
   } catch (error) {
       res.json({ success: false, message: error.message });
   }
}
