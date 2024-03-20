import { Router } from "express";
import { createTask,getTasks ,getTaskById,updateTask,deleteTaskById} from "../controllers/task.controller";
import verifyToken from "../middlewears/verifyToken.middleweare"
const router = Router();

router.post("/CreateTasks", verifyToken,createTask);
router.get("/getTasks", verifyToken,getTasks);
router.get("/getTasksbyid/:id", verifyToken,getTaskById);
router.put("/updateTasksbyid/:id", verifyToken,updateTask);
router.delete("/deleteTaskbyId/:id",verifyToken,deleteTaskById)

export default router;
