import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AppContext } from '../../AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-4 sm:m-5'>
      <p className='mb-3 text-lg sm:text-xl font-medium'>All Appointments</p>
      
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        {/* Header for larger screens */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-4 sm:px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.slice().reverse().map((item, index) => (
          <div
            key={index}
            className='flex flex-col sm:flex-row sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-start sm:items-center gap-3 sm:gap-1 px-4 sm:px-6 py-3 border-b hover:bg-gray-50 text-gray-500'
          >
            <p className='sm:hidden font-medium'>#{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt={item.userData.name} />
              <p className='truncate'>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <div>
              <p className='text-xs sm:text-sm inline border border-primary px-2 py-0.5 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            {/* Age */}
            <p className='sm:hidden'>Age: {calculateAge(item.userData.dob)}</p>
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Actions */}
            <div className='flex gap-2 mt-2 sm:mt-0'>
              {item.cancelled ? (
                <p className='text-red-400 text-xs sm:text-sm font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs sm:text-sm font-medium'>Completed</p>
              ) : (
                <>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 h-8 sm:w-10 sm:h-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-8 h-8 sm:w-10 sm:h-10 cursor-pointer'
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
