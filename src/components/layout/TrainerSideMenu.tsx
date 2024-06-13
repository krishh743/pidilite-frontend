// components/sidebar/TrainerSidebar.js
import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const TrainerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/trainer/dashboard", label: "Trainer Dashboard" },
    { path: "/trainer/test-t", label: "Training Schedule" },

    // Add more trainer-specific links here
  ];

  const handleMenuClick = (path:any) => {
    navigate(path);
  };

  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
      {menuItems.map(({ path, label }) => (
        <Menu.Item key={path} onClick={() => handleMenuClick(path)}>
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default TrainerSidebar;