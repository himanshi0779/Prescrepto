import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);

  return (
    <div className='min-h-screen bg-white border-r w-20 sm:w-64'>
      {dToken && (
        <ul className='text-[#515151] mt-5 flex flex-col'>
          {[
            { to: '/doctor/dashboard', icon: assets.home_icon, label: 'Dashboard' },
            { to: '/doctor/appointments', icon: assets.appointment_icon, label: 'Appointments' },
            { to: '/doctor/profile', icon: assets.people_icon, label: 'Profile' },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-3 sm:px-6 cursor-pointer hover:bg-gray-100 transition-all rounded-l-lg ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : ''
                }`
              }
            >
              <img src={item.icon} alt={item.label} className='w-5 h-5 sm:w-6 sm:h-6' />
              <p className='hidden sm:block text-sm sm:text-base'>{item.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
