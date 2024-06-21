// Sidebar.js
import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin/add-user", icon: "", label: "Add User" },
    // { path: "/admin/training-games", icon: "", label: "Training Games" },
    { path: "/admin/setup", icon: "", label: "setup" },
    { path: "/admin/live-games", icon: "", label: "Live Games" },
    // { path: "/admin/players-leaderboard", icon: "", label: "Players & Leaderboard" },

    

  ];


  const handleMenuClick = (path:any) => {
    navigate(path);
  };

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
      {menuItems.map(({ path, icon, label }) => (
        <Menu.Item key={path} icon={icon} onClick={() => handleMenuClick(path)}>
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default AdminSidebar;
