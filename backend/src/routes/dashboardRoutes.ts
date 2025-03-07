import express, { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { getDasboardData } from "../controllers/dashboardController";
const router: Router = express.Router();

router.get("/", protect, getDasboardData);



export default router;
