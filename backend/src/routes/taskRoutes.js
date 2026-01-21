import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

/*
 @route   PUT /api/tasks/:id
 @desc    Update a task by ID
 @access  Private
*/
router.put("/:id", updateTask);
/*
 @route   DELETE /api/tasks/:id
 @desc    Delete a task by ID
 @access  Private
*/
router.delete("/:id", deleteTask);
export default router;
