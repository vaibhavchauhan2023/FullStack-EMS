import { Router } from "express";
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";

const employeesRouter = Router();

employeesRouter.get("/",protect,protectAdmin, getEmployees)
employeesRouter.post("/", protect,protectAdmin, createEmployeesEmployees)
employeesRouter.put("/:id", protect,protectAdmin, updateEmployeesEmployees)
employeesRouter.delete("/:id", protect,protectAdmin, deleteEmployeesEmployees)

export default employeesRouter;