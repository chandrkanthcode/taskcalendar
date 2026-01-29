import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api/taskApi";

/* =======================
   Helpers (OUTSIDE component)
======================= */

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const isOverdue = (task) => {
  if (task.status === "completed") return false;
  if (!task.dueDate) return false;
  return new Date(task.dueDate) < new Date();
};

/* =======================
   Component
======================= */

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  /* ---------- Load tasks ---------- */
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

  /* ---------- Create ---------- */
  const handleCreate = async (task) => {
    try {
      await createTask(task);
      loadTasks();
    } catch (err) {
      console.log("AXIOS ERROR OBJECT:", err);
      console.log("STATUS:", err.response?.status);
      console.log(
        "BACKEND MESSAGE FULL:",
        JSON.stringify(err.response?.data, null, 2)
      );
    }
  };

  /* ---------- Update ---------- */
  const handleUpdate = async (task) => {
    try {
      await updateTask(editingTask._id, task);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  /* ---------- Status Toggle ---------- */
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = getNextStatus(task.status);
      const getNextStatus = (current) => {
        switch (current) {
          case "pending":
            return "in-progress";
          case "in-progress":
            return "completed";
          case "completed":
            return "pending";
          default:
            return "pending";
        }
      };


      await updateTask(task._id, { status: newStatus });
      loadTasks();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  /* =======================
     Render
  ======================= */

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks</h1>

      {/* ================= Form ================= */}
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

      {/* ================= Task List ================= */}
      <h2>Task List</h2>

      {tasks.length === 0 && <p>No tasks found.</p>}

      {[...tasks]
        .sort(
          (a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        )
        .map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              backgroundColor:
                task.status === "completed"
                  ? "#d1fae5" // green
                  : isOverdue(task)
                  ? "#fee2e2" // red
                  : "#ffffff",
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p><b>Priority:</b> {task.priority}</p>
            <p><b>Due:</b> {task.dueDate?.slice(0, 10)}</p>
            <p><b>Tags:</b> {task.tags?.join(", ")}</p>
            <p><b>Status:</b> {task.status || "pending"}</p>

            {isOverdue(task) && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                OVERDUE
              </p>
            )}

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

              <button
                onClick={() => handleToggleStatus(task)}
                style={{ marginLeft: "10px" }}
              >
                {task.status === "completed"
                  ? "Mark Pending"
                  : "Mark Completed"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
