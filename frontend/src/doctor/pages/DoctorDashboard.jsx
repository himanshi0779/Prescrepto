import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AppContext } from '../../AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className='m-4 sm:m-5'>
      {/* Summary Cards */}
      <div className='flex flex-wrap gap-4'>
        {[
          { icon: assets.earning_icon, label: 'Earnings', value: `${currency}${dashData.earnings}` },
          { icon: assets.appointments_icon, label: 'Appointments', value: dashData.appointments },
          { icon: assets.patients_icon, label: 'Patients', value: dashData.patients },
        ].map((card, idx) => (
          <div
            key={idx}
            className='flex-1 min-w-[150px] flex items-center gap-3 bg-white p-4 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
          >
            <img className='w-5 sm:w-6' src={card.icon} alt={card.label} />
            <div>
              <p className='text-lg sm:text-xl font-semibold text-gray-600'>{card.value}</p>
              <p className='text-gray-400 text-sm sm:text-base'>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className='bg-white mt-6 rounded border'>
        <div className='flex items-center gap-2 px-4 py-3 border-b'>
          <img src={assets.list_icon} alt="list" className='w-5 sm:w-6' />
          <p className='font-semibold text-sm sm:text-base'>Latest Bookings</p>
        </div>

        <div className='flex flex-col divide-y'>
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-3 gap-2 sm:gap-4 hover:bg-gray-50'
            >
              <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />

              <div className='flex-1 text-sm'>
                <p className='font-medium text-gray-800 truncate'>{item.userData.name}</p>
                <p className='text-gray-600 text-xs sm:text-sm'>{slotDateFormat(item.slotDate)}</p>
              </div>

              <div className='flex gap-2 mt-2 sm:mt-0 ml-auto'>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs sm:text-sm font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs sm:text-sm font-medium'>Completed</p>
                ) : (
                  <>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-all'
                      src={assets.cancel_icon}
                      alt="cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-all'
                      src={assets.tick_icon}
                      alt="complete"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
