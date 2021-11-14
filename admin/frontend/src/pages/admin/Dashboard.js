import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Users from "./Users";
import MenuDashboard from "./MenuDashboard";

function Dashboard({ session }) {
  return (
    <div>
      <MenuDashboard />
      <Outlet />
    </div>
  );
}

export default Dashboard;
