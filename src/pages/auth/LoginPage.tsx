// src/pages/auth/LoginPage.tsx
import React from "react";
import "./LoginPage.css";
import banner from "../../assets/Images/login-banner.png";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { AdminLogin } from "../../services/ApiServices";

const Login = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const baseUri = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      phoneNumber: phone,
      password: password,
    };

    try {
      const response = await AdminLogin(data);

      // fetch(`${baseUri}/api/trainer/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // const resdata = await response.json();
console.log(response)
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("type", response?.data?.type);

        setIsLoading(false);

        if (response?.data?.type === 1) {
          navigate("/admin/setup");
        } else if (response?.data?.type === 2) {
          navigate("/trainer/games-play");
        }
      } else {
        setIsLoading(false);
        alert(response.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="loginMain">
      {isLoading && (
        <div className="loaderContainer">
          <div className="loader">
            <Oval
              visible={true}
              height="50"
              width="50"
              color="#ffffff"
              ariaLabel="oval-loading"
            />
          </div>
        </div>
      )}
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <div className="loginCard rounded-xl flex items-center">
        <span>trainer / admin login 7249035102</span>
        <div className="inputDiv">
          <span className="phoneNumberInput">Phone Number</span>
          <input
            type="text"
            className=""
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="inputDiv">
          <span className="">Password</span>
          <input
            type="password"
            className=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="enterbtn" onClick={handleSubmit}>
          Enter
        </button>
        <span className="text-sm">
          Admin number - 9309125102, Trainer Number - 7259035102{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
