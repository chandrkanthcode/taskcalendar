import { Routes, Route, Link } from "react-router-dom";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager App Running 🚀</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/tasks">Tasks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
