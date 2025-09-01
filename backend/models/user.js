
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;