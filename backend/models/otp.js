

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    otpExpiry: {
        type: Date,

    }
}, { timestamps: true });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;