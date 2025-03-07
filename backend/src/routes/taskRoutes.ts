import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { addTask, deleteTask, updateTask, getAllTasks } from "../controllers/taskController";

const router: Router = express.Router();

router.post("/add", protect, addTask);
router.get("/getAll", protect, getAllTasks);
router.put("/update/:id", protect, updateTask);
router.delete("/delete/:id", protect, deleteTask);


export default router;
