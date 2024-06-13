// import { SearchIcon } from '@heroicons/react/outline';
import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchKeyword, setSearchKeyword] = useState(
    queryParams.get("searchKeyword") || ""
  );

  const handleInputChange = (e: any) => {
    const newSearchKeyword = e.target.value;
    setSearchKeyword(newSearchKeyword);
    // Cookies.set('searchKeyWord', newSearchKeyword);

    queryParams.set("searchKeyword", newSearchKeyword);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: 'white',
        position: "sticky",
        width: "100%",
        top: 0,
        // borderBottom: "2px solid #212121",
        zIndex: 1,
        height: 70,
        boxShadow:
          "0 2px 2px rgba(0, 0, 0, 0.1), 0 2px 0px rgba(0, 0, 0, 0.06)",
      }}
      className={`${"justify-between"} z-40 flex items-center`}
    >
   

    
    </div>
  );
};

export default CustomHeader;
