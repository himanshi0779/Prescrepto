import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserContext } from '../context/UserContext'

const NavBar = () => {

  const navigate=useNavigate();
  const {token,setToken, userData}=useContext(UserContext)

  const [showMenu, setShowMenu]=useState(true);

  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
    
  }
  const menuItems=[
    {name: "HOME", path:"/"},
    {name: "ALL DOCTORS", path:"/doctors"},
    {name:"ABOUT", path:"/about"},
    {name:"CONTACT", path:"/contact"},
  ]


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400 '>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt=""/>
        <ul className='md:flex items-start gap-5 font-medium'>
            <NavLink to="/" className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <li className="py-1">{isActive ? "HOME" : "HOME"}</li>
          {isActive && (
            <hr className="h-0.5 w-3/5 bg-primary border-none mt-1" />
          )}
        </>
      )}
    </NavLink>
    <NavLink to="/doctors" className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <li className="py-1">ALL DOCTORS</li>
          {isActive && (
            <hr className="h-0.5 w-3/5 bg-primary border-none mt-1" />
          )}
        </>
      )}
    </NavLink>
    <NavLink to="/about" className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <li className="py-1">ABOUT US</li>
          {isActive && (
            <hr className="h-0.5 w-3/5 bg-primary border-none mt-1" />
          )}
        </>
      )}
    </NavLink>
    <NavLink to="/contact" className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <li className="py-1">CONTACT US</li>
          {isActive && (
            <hr className="h-0.5 w-3/5 bg-primary border-none mt-1" />
          )}
        </>
      )}
    </NavLink>

        </ul>
        <div className='flex items-center gap-4'>
          {
            token && userData?
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image}/>
              <img className='w-2.5' src={assets.dropdown_icon}/>
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-50 bg-stone-100 rounded flex flex-col gap-4 p-3'>
                  <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={()=>navigate('/admin/login')} className='hover:text-black cursor-pointer'>Admin Login</p>
                  <p onClick={()=>navigate('/doctor/login')} className='hover:text-black cursor-pointer'>Doctor Login</p>
                  <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            :
          <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'> Create Account</button>
          }

          <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt=''/>

          <div className={`${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
              <img className='w-36 ' src={assets.logo} alt="" />
              <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
              <NavLink to='/' onClick={()=>setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
              <NavLink to='/doctors' onClick={()=>setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
              <NavLink to='/about' onClick={()=>setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
              <NavLink to='/contact' onClick={()=>setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default NavBar