import { Request, Response } from "express";
import TaskModel from "../models/tasks.model";

interface CustomRequest extends Request {
  user?: any;
}

const createTask = async (req: CustomRequest, res: Response) => {
  try {
    const task = new TaskModel({
      ...req.body,
      owner: req.user.id,
    });
    const savedTask = await task.save();
    return res.status(200).json({
      message: "task created succsesfully",
      savedTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "task not created",
      error,
    });
  }
};

const getTasks = async (req: CustomRequest, res: Response) => {
  try {
    const task = await TaskModel.find({ owner: req.user.id });
    return res.status(200).json({
      task,
      count: task.length,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const getTaskById = async (req: CustomRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const ownerId = req.user.id;

    const task = await TaskModel.findOne({
      _id: taskId,
      owner: ownerId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error("Error retrieving task:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving task" });
  }
};

const updateTask = async (req: CustomRequest, res: Response) => {
  const taskId = req.params.id;
  const ownerId = req.user.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  // Check if the updates are valid
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).json({ message: "Invalid updates" });
  }

  try {
    // Find the task by ID and owner
    const task = await TaskModel.findOne({ _id: taskId, owner: ownerId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task properties based on request body
    updates.forEach((update) => {
      (task as any)[update] = req.body[update]; // Casting to any to avoid TypeScript error
    });

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "An error occurred while updating task" });
  }
};



const deleteTaskById = async (req: CustomRequest, res: Response) => {
    try {
      const taskId = req.params.id;
      const ownerId = req.user.id;
  
      const task = await TaskModel.findByIdAndDelete({
        _id: taskId,
        owner: ownerId,
      });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      return res.status(200).json({
        message:"task deleted succsesfully"
      });
    } catch (error) {
      console.error("Error retrieving task:", error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving task" });
    }
  };
  


export { createTask, getTasks, getTaskById, updateTask ,deleteTaskById};
