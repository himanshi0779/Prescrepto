import React, { useContext, useState } from 'react';
import { assets } from "../../assets/assets";
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const logout = () => {
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    navigate('/admin/login');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white sticky top-0 z-40'>
      {/* Left section */}
      <div className='flex items-center gap-2'>
        <img 
          className='w-24 sm:w-36 md:w-40 cursor-pointer' 
          src={assets.admin_logo} 
          alt="Logo" 
          onClick={() => navigate('/admin')} 
        />
        <p className='border px-2 py-0.5 rounded-full border-gray-400 text-gray-600 text-xs sm:text-sm'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Desktop buttons */}
      <div className='hidden md:flex items-center gap-4'>
        <button 
          onClick={logout} 
          className='bg-[#5F65FFFF] text-white text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#4a54cc] transition'
        >
          Logout
        </button>
      </div>

      {/* Mobile menu button */}
      <button 
        className='md:hidden bg-gray-200 p-2 rounded-full ml-2'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <img src={assets.menu_icon} alt="Menu" className='w-5 h-5' />
      </button>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className='fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-md p-5 flex flex-col gap-6 overflow-y-auto'>
          <button className='self-end mb-4' onClick={() => setShowSidebar(false)}>
            <img src={assets.cross_icon} alt="Close" className='w-6 h-6' />
          </button>
          <p 
            className='cursor-pointer hover:text-blue-600 text-base'
            onClick={() => { navigate('/admin'); setShowSidebar(false); }}
          >
            Dashboard
          </p>
          <p 
            className='cursor-pointer hover:text-blue-600 text-base'
            onClick={() => { navigate('/admin/all-appointments'); setShowSidebar(false); }}
          >
            Appointments
          </p>
          <p 
            className='cursor-pointer hover:text-blue-600 text-base'
            onClick={() => { navigate('/admin/add-doctor'); setShowSidebar(false); }}
          >
            Add Doctor
          </p>
          <p 
            className='cursor-pointer hover:text-blue-600 text-base'
            onClick={() => { navigate('/admin/doctor-list'); setShowSidebar(false); }}
          >
            Doctors List
          </p>
          <button 
            onClick={logout} 
            className='bg-[#5F65FFFF] text-white text-sm px-4 py-2 rounded-full hover:bg-[#4a54cc] transition mt-4'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
