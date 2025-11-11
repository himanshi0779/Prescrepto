import React from 'react';
import { specialityData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800 px-4"
      id="speciality"
    >
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Find by Speciality
      </h1>

      <p className="text-sm text-center sm:w-1/2 md:w-1/3 text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      {/* ✅ Horizontal Scroll for Mobile, Centered Layout for Desktop */}
      <div
        className="
          flex gap-6 sm:gap-10 pt-6
          scrollbar-none
          w-full sm:w-auto sm:justify-center
        "
      >
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className="
              flex flex-col items-center flex-shrink-0 cursor-pointer
              hover:-translate-y-2 transition-all duration-500
              snap-start
            "
          >
            <img
              className="w-16 sm:w-24 mb-2"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-xs sm:text-sm text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
