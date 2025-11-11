import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { assets } from '../../assets/assets.js';
import { AppContext } from '../../AppContext.jsx';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-4 sm:m-5'>
      <h2 className='mb-4 text-lg sm:text-xl font-semibold text-gray-700'>All Appointments</h2>

      {/* Desktop Table */}
      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-2 bg-white border rounded text-sm overflow-x-auto'>
        <div className='py-3 px-6 border-b font-medium'>#</div>
        <div className='py-3 px-6 border-b font-medium'>Patient</div>
        <div className='py-3 px-6 border-b font-medium'>Age</div>
        <div className='py-3 px-6 border-b font-medium'>Date & Time</div>
        <div className='py-3 px-6 border-b font-medium'>Doctor</div>
        <div className='py-3 px-6 border-b font-medium'>Fees</div>
        <div className='py-3 px-6 border-b font-medium'>Actions</div>

        {appointments.map((item, index) => (
          <React.Fragment key={item._id}>
            <p className='py-3 px-6 border-b'>{index + 1}</p>
            <div className='flex items-center gap-2 py-3 px-6 border-b'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='py-3 px-6 border-b'>{calculateAge(item.userData.dob)}</p>
            <p className='py-3 px-6 border-b'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2 py-3 px-6 border-b'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p className='py-3 px-6 border-b'>{currency}{item.amount}</p>
            <div className='py-3 px-6 border-b'>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-6 h-6 cursor-pointer'
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className='flex flex-col sm:hidden gap-4'>
        {appointments.map((item, index) => (
          <div key={item._id} className='bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <p className='font-medium'>#{index + 1}</p>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-6 h-6 cursor-pointer'
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt="" />
              <p>{item.userData.name} ({calculateAge(item.userData.dob)} yrs)</p>
            </div>
            <p>Date & Time: {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 rounded-full object-cover' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>Fees: {currency}{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
