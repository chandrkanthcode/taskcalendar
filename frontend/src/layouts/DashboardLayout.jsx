import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
