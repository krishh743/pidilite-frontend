// components/layout/AppLayout.js
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./Header";
import TrainerSidebar from "./TrainerSideMenu";
import AdminSidebar from "./AdminSidemenu";

const { Sider, Content } = Layout;

const AppLayout = () => {
  const type = localStorage.getItem("type");

  const renderSidebar = () => {
    switch (type) {
      case "1":
        return <AdminSidebar />;
      case "2":
        return <TrainerSidebar />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <CustomHeader />
      <Layout>
        <Sider
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 4px 4px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.06)",
            height: "calc(100vh - 70px)", // Adjust height to be full height minus header height
            position: "sticky",
            top: "70px", // Start below the header
          }}
        >
          {renderSidebar()}
        </Sider>
        <Layout
          style={{
            padding: "24px",
            height: "calc(100vh - 70px)",
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
