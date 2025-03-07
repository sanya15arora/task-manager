import express, { Router, Response, Request } from "express";
import { protect } from "../middleware/authMiddleware";
import { getUserInfo, loginUser, registerUser } from "../controllers/authController";
import upload from "../middleware/uploadMiddleware";

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req: MulterRequest, res: Response) => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
});

export default router;
