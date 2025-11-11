import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r w-20 md:w-72 transition-all">
      {dToken && (
        <ul className="text-[#515151] mt-5">

          {/* Dashboard */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-4 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : ''
              }`
            }
            to={'/doctor/dashboard'}
          >
            <img
              src={assets.home_icon}
              alt="dashboard"
              className="w-6 h-6 flex-shrink-0"
            />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-4 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : ''
              }`
            }
            to={'/doctor/appointments'}
          >
            <img
              src={assets.appointment_icon}
              alt="appointments"
              className="w-6 h-6 flex-shrink-0"
            />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          {/* Profile */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-4 py-3.5 px-4 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : ''
              }`
            }
            to={'/doctor/profile'}
          >
            <img
              src={assets.people_icon}
              alt="profile"
              className="w-6 h-6 flex-shrink-0"
            />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
