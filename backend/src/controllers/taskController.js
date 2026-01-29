import Task from "../models/Task.js";

/* 
   GET /api/tasks
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 
   POST /api/tasks
 */
export const createTask = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 👈 ADD
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error); // 👈 ADD
    res.status(400).json({
      message: error.message,
      errors: error.errors,
    });
  }
};


/* 
   PUT /api/tasks/:id
 */
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* 
   DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
