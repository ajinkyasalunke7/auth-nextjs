import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true, // Fix the typo here
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            unique: true, // Fix the typo here
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            unique: true, // Fix the typo here
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
