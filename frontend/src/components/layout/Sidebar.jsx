import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <nav className="space-y-3">
        <NavLink to="/" className="block hover:text-blue-400">
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className="block hover:text-blue-400">
          Tasks
        </NavLink>
        <Link
          to="/calendar"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          📅 Calendar
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
