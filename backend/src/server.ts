import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import path from "path";
import taskRoutes from "./routes/taskRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

// Load environment variables
dotenv.config();

// Initialize Express
const app: Express = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

// Connect to Database and start server
connectDB();


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


export default app;
