import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for the task document
interface ITask extends Document {
    description: string;
    completed: boolean;
    owner: Types.ObjectId;
}

// Define the task schema
const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    owner: { type: Types.ObjectId, required: true, ref: "User" } // Assuming "User" is the name of the user model
}, { timestamps: true });

// Define the task model
const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
