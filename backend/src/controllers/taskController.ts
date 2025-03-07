import {  Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import Task from "../models/Task";

// **Add Task**
export const addTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { title, description = "", status = "Pending" } = req.body;
        if (!title) {
            res.status(400).json({ message: "Title is required." });
            return;
        }

        const newTask = new Task({
            userId,
            title,
            description,
            status,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error adding new task", error: (err as Error).message });
    }
};

// **Get All Tasks for a User**
export const getAllTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const tasks = await Task.find({ userId }).sort({ createdAt: -1 }); 
        res.status(200).json(tasks);
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error fetching tasks", error: (err as Error).message });
    }
};

// **Update Task**
export const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const allowedUpdates = ["title", "description", "status"];
        const updates: Record<string, any> = {};
        for (const key of Object.keys(req.body)) {
            if (allowedUpdates.includes(key)) updates[key] = req.body[key];
        }

        const updatedTask = await Task.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
        if (!updatedTask) {
            res.status(404).json({ message: "Task not found or unauthorized" });
            return;
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error updating task", error: (err as Error).message });
    }
};

// **Delete Task**
export const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found or unauthorized" });
            return;
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        res.status(500).json({ message: "Error deleting task", error: (err as Error).message });
    }
};
