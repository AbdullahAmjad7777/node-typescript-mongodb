import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
import verifyToken from "../middlewears/verifyToken.middleweare"
const router = Router();

router.post("/Registration", createUser);
router.post("/Login",loginUser);
export default router;
