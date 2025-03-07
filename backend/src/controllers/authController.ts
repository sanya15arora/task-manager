import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Generate JWT Token
const generateToken = (id: mongoose.Types.ObjectId): string => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }

        const user = await User.create({ fullName, email, password, profileImageUrl });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error registering user", error: (err as Error).message });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error registering user", error: (err as Error).message });
    }
};

// Get User Info
export const getUserInfo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(400).json({ message: "User ID missing from request." });
            return;
        }
        const user = await User.findById(req.user?.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json(user);

    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error registering user", error: (err as Error).message });
    }

};
