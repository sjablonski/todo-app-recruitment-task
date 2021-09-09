import { Router } from "express";
import { todoTask } from "controllers";
import TodoTask from "dto/TodoTask";
import dtoValidation from "middlewares/dtoValidation";

const router = Router();

router.get("/todo-tasks", todoTask.getTasks);
router.post("/todo-task", dtoValidation(TodoTask), todoTask.addTask);
router.put("/todo-task/:id", dtoValidation(TodoTask), todoTask.updateTask);
router.delete("/todo-task/:id", todoTask.deleteTask);

export default router;
