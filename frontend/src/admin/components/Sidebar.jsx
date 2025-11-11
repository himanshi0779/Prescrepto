import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null;

  return (
    <div className='hidden md:flex flex-col min-h-screen w-64 bg-white border-r sticky top-0'>
      <ul className='text-[#515151] mt-5 flex flex-col gap-1'>
        <NavLink 
          className={({ isActive }) => 
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer rounded-r-lg ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : 'hover:bg-gray-100'
            }`
          } 
          to={'/admin/dashboard'}
        >
          <img src={assets.home_icon} alt="Dashboard" className='w-5 h-5' />
          <p className='text-sm'>Dashboard</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => 
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer rounded-r-lg ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : 'hover:bg-gray-100'
            }`
          } 
          to={'/admin/all-appointments'}
        >
          <img src={assets.appointment_icon} alt="Appointments" className='w-5 h-5' />
          <p className='text-sm'>Appointments</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => 
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer rounded-r-lg ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : 'hover:bg-gray-100'
            }`
          } 
          to={'/admin/add-doctor'}
        >
          <img src={assets.add_icon} alt="Add Doctor" className='w-5 h-5' />
          <p className='text-sm'>Add Doctor</p>
        </NavLink>

        <NavLink 
          className={({ isActive }) => 
            `flex items-center gap-3 py-3.5 px-6 cursor-pointer rounded-r-lg ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5F65FF]' : 'hover:bg-gray-100'
            }`
          } 
          to={'/admin/doctor-list'}
        >
          <img src={assets.people_icon} alt="Doctors List" className='w-5 h-5' />
          <p className='text-sm'>Doctors List</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
