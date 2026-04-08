import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
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
})

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;