import React, { useEffect, useState } from "react";

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5002/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const isOverdue = (task) => {
    if (task.status === "completed") return false;
    return new Date(task.dueDate) < new Date();
  };

  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "completed" ? "pending" : "completed";

    await fetch(`http://localhost:5002/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    fetchTasks();
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {sortedTasks.map((task) => (
        <div
          key={task._id}
          className={`flex justify-between items-center p-4 mb-3 rounded border
            ${
              task.status === "completed"
                ? "bg-green-100 line-through"
                : isOverdue(task)
                ? "bg-red-100"
                : "bg-white"
            }
          `}
        >
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Priority: <b>{task.priority}</b>
            </p>

            {isOverdue(task) && (
              <span className="text-red-600 text-xs font-bold">
                OVERDUE
              </span>
            )}
          </div>

          <button
            onClick={() => toggleStatus(task)}
            className={`px-3 py-1 rounded text-sm ${
              task.status === "completed"
                ? "bg-gray-400 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {task.status === "completed" ? "Undo" : "Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
