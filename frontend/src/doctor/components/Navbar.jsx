import React, {useContext, useState} from 'react'
import { AppContext } from '../../AppContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'


const Navbar=()=>{
    const {dToken, setDToken}= useContext(DoctorContext)

    const navigate= useNavigate()
    const [showSidebar, setShowSidebar] = useState(false)
    const [showMenu, setShowMenu] = useState(true)

    const logout=()=>{
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{dToken? 'Doctor':'Admin'}</p>
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
                      <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/doctor/dashboard'); setShowSidebar(false) }}>Dashboard</p>
                      <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/doctor/appointments'); setShowSidebar(false) }}>Appointments</p>
                      <p className='cursor-pointer hover:text-blue-600' onClick={() => { navigate('/doctor/profile'); setShowSidebar(false) }}>Profile</p>
                    </div>
                  )}
        </div>

    )
}

export default Navbar