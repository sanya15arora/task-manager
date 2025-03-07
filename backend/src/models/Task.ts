import mongoose, { Document, Schema, Model } from "mongoose";

interface ITask extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    status: "Pending" | "Inprogress" | "Completed";
    createdAt?: Date;
    updatedAt?: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Inprogress", "Completed"], default: "Pending" },
    },
    { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);
export default Task;
