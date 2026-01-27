import { useTasks } from "../context/TaskContext";

const Dashboard = () => {
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading...</p>;

  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.length - completed;

  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>

      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>
    </div>
  );
};

export default Dashboard;
