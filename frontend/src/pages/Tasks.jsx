import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api/taskApi";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from DB
  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Create
  const handleCreate = async (task) => {
    try {
      await createTask(task);
      loadTasks(); // refresh UI
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Update
  const handleUpdate = async (task) => {
    try {
      await updateTask(editingTask._id, task);
      setEditingTask(null); // back to create mode
      loadTasks(); // refresh UI
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks(); // refresh UI
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks</h1>

      {/* Form */}
      <div style={{ marginBottom: "30px" }}>
        <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          initialData={editingTask}
        />

        {editingTask && (
          <button
            onClick={() => setEditingTask(null)}
            style={{ marginTop: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Task List */}
      <h2>Task List</h2>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <p><b>Priority:</b> {task.priority}</p>
          <p><b>Due:</b> {task.dueDate?.slice(0, 10)}</p>
          <p><b>Tags:</b> {task.tags?.join(", ")}</p>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setEditingTask(task)}>
              Edit
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
