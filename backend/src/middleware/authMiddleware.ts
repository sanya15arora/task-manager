import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = await User.findById((decoded as jwt.JwtPayload).id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
        return
    }
}

