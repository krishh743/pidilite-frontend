// import { SearchIcon } from '@heroicons/react/outline';
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/pidlite-logo.png";
import irm from "../../assets/Images/DTXLogo.png";

const CustomHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "white",
        position: "sticky",
        width: "100%",
        top: 0,
        zIndex: 1,
        height: 70,
        boxShadow:
          "0 2px 2px rgba(0, 0, 0, 0.1), 0 2px 0px rgba(0, 0, 0, 0.06)",
      }}
      className={`${"justify-between"} z-40 flex items-center flex-row`}
    >
      <div className="flex flex-row items-center justify-center gap-4">
        <img src={irm} alt="" className="irm h-12" />
        <img src={logo} alt="" className="logo h-12" />
      </div>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default CustomHeader;
