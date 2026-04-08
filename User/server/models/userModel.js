import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyOtp: {
        type: String,
        default: '',
    },
    OtpExpiry: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: '',
    },
    resetOtpExpiry: {
        type: Number,
        default: 0,
    },
    profilePhoto: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
}, { timestamps: true });


const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;