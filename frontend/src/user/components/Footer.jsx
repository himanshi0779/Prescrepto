import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
        {/*-----Left--------*/}

        <div>
            <img className='mb-5 w-40' src={assets.logo} alt=''/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is a healthcare-focused application designed to streamline doctor-patient interactions by providing digital solutions for appointments, prescriptions, and patient management. It allows doctors to create and share prescriptions electronically, manage their schedules, and even generate payment links for consultations. Patients can book appointments, access their prescriptions digitally, and make payments online, ensuring a seamless and efficient experience.</p>
        </div>

        {/*-----Center-------*/}

        <div>
  <p className='text-xl font-medium mb-5'>COMPANY</p>
  <ul className='flex flex-col gap-2 text-gray-600'>
    <li>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "" }
      >
        Home
      </NavLink>
    </li>
        <li>
      <NavLink 
        to="/doctors" 
        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "" }
      >
        All Doctors
      </NavLink>
    </li>
    <li>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "" }
      >
        About Us
      </NavLink>
    </li>
    <li>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => isActive ? "text-blue-500 font-semibold" : "" }
      >
        Contact Us
      </NavLink>
    </li>
  </ul>
</div>

        
        {/*------Right-------*/}

        <div>
            <p className='text-sl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>greatstackdev@gmail.com</li>
            </ul>

        </div>
    </div>

   <div>
    <hr />
    <p className='py-5 text-sm text-center '>Copyright © 2025 GreatStack - All Right Reserved.</p>
    </div>
</div>
  )
}

export default Footer