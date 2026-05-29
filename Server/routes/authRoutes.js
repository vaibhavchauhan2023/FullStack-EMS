import { Router } from "express";
import { changePassword, login, session } from "../controllers/authController";
import { protect } from "../middleware/auth.js";

const authRouter = Router();

employeesRouter.post("/login", login)
employeesRouter.get("/session",protect, session)
employeesRouter.post("/change-password",protect, changePassword)


export default authRouter