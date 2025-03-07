import multer, { StorageEngine } from "multer";
import { Request } from "express";

// Define the storage configuration
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Define the file filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: null, acceptFile: boolean) => void): void => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false); 
    }
};

// Multer upload instance
const upload = multer({ storage, fileFilter });

export default upload;
