import { useTasks } from "../context/TaskContext";

const Tasks = () => {
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tasks</h1>

      {tasks.map(task => (
        <div key={task._id} className="border p-3 mb-2 rounded">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <span className="text-sm text-gray-500">
            Priority: {task.priority}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
