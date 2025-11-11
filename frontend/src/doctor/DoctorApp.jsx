import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { DoctorContext } from "./context/DoctorContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorProfile from "./pages/DoctorProfile";
import { ToastContainer } from "react-toastify";

const DoctorApp = () => {
  const { dToken } = useContext(DoctorContext);
  

  
  if (!dToken) {
    return <Navigate to="/doctor/login" />;
  }

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer/>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />

        <Routes>
          {/* Default route: dashboard */}
          <Route index element={<DoctorDashboard />} />

          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="profile" element={<DoctorProfile />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/doctor/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorApp;
