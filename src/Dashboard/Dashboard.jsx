import React from "react";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <DashboardLayout />
      <Outlet />
    </div>
  );
};

export default Dashboard;
