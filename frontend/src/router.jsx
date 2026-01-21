import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Calendar from "./pages/Calendar.jsx";
import Analytics from "./pages/Analytics.jsx";
import NotFound from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "*", element: <NotFound /> },
]);
