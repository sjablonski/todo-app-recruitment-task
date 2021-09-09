import { Request, Response } from "express";
import TodoTask from "models/TodoTask";

const todoTask = {
  getTasks: async (req: Request, res: Response) => {
    try {
      const pageSize = req.query.limit
        ? parseInt(req.query.limit as string)
        : 10;
      const pageNumber = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      const order = req.query.order ? req.query.order : "asc";
      const sort = req.query.sort
        ? { [req.query.sort as string]: order }
        : { _id: "asc" };

      const count = await TodoTask.count();
      const tasks = await TodoTask.find()
        .sort(sort)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      res.send({ count, rows: tasks });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error get task list" });
    }
  },

  addTask: async (req: Request, res: Response) => {
    try {
      const { title, description, finished } = req.body;
      const newTaskContent = {
        title,
        description,
        finished,
      };

      const newTask = await new TodoTask(newTaskContent).save();

      res.send(newTask);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error creating new task" });
    }
  },

  updateTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, finished } = req.body;

      const updatedTaskContent = {
        title,
        description,
        finished,
      };

      const updatedTask = await TodoTask.findByIdAndUpdate(
        id,
        updatedTaskContent,
        { new: true }
      );
      if (updatedTask) {
        res.send(updatedTask);
      } else {
        res.status(404).send({ message: "Updated task not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error updating task" });
    }
  },

  deleteTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedTask = await TodoTask.findByIdAndDelete(id);

      if (deletedTask) {
        res.send(`Deleted task id: ${id}`);
      } else {
        res.status(404).send({ message: "Deleting task not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error deleting task" });
    }
  },
};

export default todoTask;
