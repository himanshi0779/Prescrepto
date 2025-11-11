import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from "../../assets/assets";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className='m-4 sm:m-5'>
      <h1 className='text-lg sm:text-xl font-semibold mb-4'>All Doctors</h1>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {doctors.map((item, index) => (
          <div 
            key={index} 
            className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md transition-all'
          >
            <div className="w-full h-48 sm:h-56 bg-blue-50 flex items-center justify-center overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="h-full w-auto object-contain"
  />
</div>
            <div className='p-4 flex flex-col gap-2'>
              <p className='text-neutral-800 text-lg font-medium truncate'>{item.name}</p>
              <p className='text-zinc-600 text-sm truncate'>{item.speciality}</p>
              <div className='flex items-center gap-2 mt-2'>
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  className='w-4 h-4 accent-blue-500 cursor-pointer'
                />
                <p className='text-sm'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
