import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { AppContext } from "../../AppContext.jsx";
import { assets } from '../../assets/assets.js';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return dashData && (
    <div className='m-4 sm:m-5 flex flex-col gap-6'>
      
      {/* Cards Section */}
      <div className='flex flex-wrap gap-4'>
        {[
          { icon: assets.doctor_icon, count: dashData.doctors, label: "Doctors" },
          { icon: assets.appointments_icon, count: dashData.appointments, label: "Appointments" },
          { icon: assets.patients_icon, count: dashData.patients, label: "Patients" },
        ].map((card, idx) => (
          <div 
            key={idx}
            className='flex items-center gap-3 bg-white p-4 sm:p-5 min-w-[120px] sm:min-w-[160px] rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:scale-105 transition-all'
          >
            <img className='w-5 sm:w-6' src={card.icon} alt={card.label} />
            <div>
              <p className='text-lg sm:text-xl font-semibold text-gray-600'>{card.count}</p>
              <p className='text-gray-400 text-sm sm:text-base'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='flex items-center gap-2 px-4 py-3 rounded-t border-b'>
          <img src={assets.list_icon} alt="List" className='w-5 sm:w-6'/>
          <p className='font-semibold text-gray-700 text-sm sm:text-base'>Latest Bookings</p>
        </div>

        <div className='flex flex-col divide-y'>
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-3 hover:bg-gray-50 gap-2 sm:gap-4'>
              <img className='rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover' src={item.docData.image} alt="Doctor" />
              <div className='flex-1 text-sm sm:text-base'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              <div className='mt-1 sm:mt-0'>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs sm:text-sm font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs sm:text-sm font-medium'>Completed</p>
                ) : (
                  <img 
                    onClick={() => cancelAppointment(item._id)} 
                    className='w-8 h-8 sm:w-10 sm:h-10 cursor-pointer' 
                    src={assets.cancel_icon} 
                    alt="Cancel"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
