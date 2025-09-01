import sendMail from "../config/sendMail.js";
import OTP from "../models/otp.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export const getOtpSignUp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Incorrect Email" });
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "User already exists! Please Login" })
        }
        const findOTP = await OTP.findOne({ email });
        if (findOTP) await OTP.findByIdAndDelete(findOTP._id, { new: true });
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await OTP.create({ otp, email, otpExpiry: Date.now() + 5 * 60 * 1000 });
        await sendMail(email, otp);
        res.status(200).json({ message: "OTP sent successfully" })

    }
    catch (e) {
        res.status(500).json({ message: `Get Otp SignUp error is ${e}` });
    }
}

export const verifyOTPSignUp = async (req, res) => {
    try {
        const { name, email, dob, otp } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Incorrect Email" });
        }
        if (!validator.isDate(dob)) {
            return res.status(400).json({ message: "Incorrect DOB" });

        }

        const findOTP = await OTP.findOne({ email });
        if (!findOTP || findOTP.otp !== otp || findOTP.otpExpiry < Date.now()) {
            return res.status(404).json({ message: "Invalid OTP" });
        }

        await OTP.findByIdAndDelete(findOTP._id, { new: true });
        const user = await User.create({ name, email, dob });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: "7h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Node",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({ message: "SignUp Successfull", data: user });


    }
    catch (e) {
        res.status(500).json({ message: `Verify Otp SignUp error is ${e}` });

    }
}


export const getOtpLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Incorrect Email" });
        }
        if (!findUser) {
            return res.status(400).json({ message: "User doesn't exists! Please SignUp" })
        }
        const findOTP = await OTP.findOne({ email });
        if (findOTP) await OTP.findByIdAndDelete(findOTP._id, { new: true });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await OTP.create({ otp, email, otpExpiry: Date.now() + 5 * 60 * 1000 });
        await sendMail(email, otp);
        res.status(200).json({ message: "OTP sent successfully" })

    }
    catch (e) {
        res.status(500).json({ message: `Get Otp Login error is ${e}` });
    }
}
export const verifyOTPLogin = async (req, res) => {
    try {
        const { email, otp, keepMeLogin } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Incorrect Email" });
        }
        const findOTP = await OTP.findOne({ email });
        const user = await User.findOne({ email });
        if (!findOTP || findOTP.otp !== otp || findOTP.otpExpiry < Date.now()) {
            return res.status(404).json({ message: "Invalid OTP" });
        }
        await OTP.findByIdAndDelete(findOTP._id, { new: true });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: keepMeLogin ? "30d" : "7h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({ message: "Login Successfull", data: user });


    }
    catch (e) {
        res.status(500).json({ message: `Verify Otp Login error is ${e}` });

    }
}


export const logoutUser = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successfull",
        })
    }
    catch (e) {
        res.status(500).json({
            message: `Logout Error is ${e}`
        })

    }
}

