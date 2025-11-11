import React, { useContext, useState } from "react";
import { AdminContext } from "./admin/context/AdminContext";
import { DoctorContext } from "./doctor/context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Admin & Doctor contexts
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  // Determine role based on URL
  const isDoctor = location.pathname.includes("/doctor/login");
  const role = isDoctor ? "Doctor" : "Admin";

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (role === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin Login Successful");
          navigate("/admin");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor Login Successful");
          navigate("/doctor");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[330px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">

        {/* Title */}
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5F6FFF]">{role}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base mt-2"
        >
          Login
        </button>

        {/* Switch Login Mode */}
        {role === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => navigate("/doctor/login")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => navigate("/admin/login")}
            >
              Click here
            </span>
          </p>
        )}

        {/* Go home */}
        <p>
          Go back to Home:{" "}
          <span
            className="text-[#5F6FFF] underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
