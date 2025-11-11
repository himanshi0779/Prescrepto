import React, {useContext, useState} from 'react'
import { assets } from "../../assets/assets"
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar=()=>{
    const {aToken, setAToken}= useContext(AdminContext)

    const navigate= useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    

    const logout=()=>{
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        navigate('/admin/login')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken? 'Admin':'Doctor'}</p>
            <button onClick={logout} className='bg-[#5F65FFFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        <button 
          className='md:hidden bg-gray-200 p-2 rounded-full'
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <img src={assets.menu_icon} alt="Menu" className='w-5 h-5' />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className='fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-md p-5 flex flex-col gap-4 md:hidden'>
          <button className='self-end mb-4' onClick={() => setShowSidebar(false)}>
            <img src={assets.cross_icon} alt="Close" className='w-6' />
          </button>
          <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/admin'); setShowSidebar(false) }}>Dashboard</p>
          <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/admin/all-appointments'); setShowSidebar(false) }}>Appointments</p>
          <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/admin/add-doctor'); setShowSidebar(false) }}>Add Doctor</p>
          <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/admin/doctor-list'); setShowSidebar(false) }}>Doctors List</p>
        </div>
      )}
      </div>

    )
}

export default Navbar