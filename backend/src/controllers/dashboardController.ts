import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import Task from "../models/Task";
import { Types } from "mongoose";

export const getDasboardData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userObjectId = new Types.ObjectId(String(userId));

        const taskStats = await Task.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);
        const tasks = await Task.find({ userId }).sort({ createdAt: -1 });


        const stats = {
            totalTasks: 0,
            pendingTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
            tasks
        };

        taskStats.forEach(stat => {
            stats.totalTasks += stat.count;
            if (stat._id === "Pending") stats.pendingTasks = stat.count;
            if (stat._id === "Inprogress") stats.inProgressTasks = stat.count;
            if (stat._id === "Completed") stats.completedTasks = stat.count;
        });

        res.status(200).json(stats);
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error fetching dashboard data", error: (err as Error).message });
    }
};
