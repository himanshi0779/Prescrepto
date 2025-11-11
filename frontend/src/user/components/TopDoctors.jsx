import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-4 md:px-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Top Doctors to Book
      </h1>

      <p className="text-sm text-center sm:w-1/2 text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ Responsive Grid */}
      <div
        className="
          w-full 
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5 
          pt-6
        "
      >
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="
              border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
              hover:-translate-y-2 transition-all duration-500 
              bg-white shadow-sm 
            "
          >
            <img
              className="bg-blue-50 w-full h-40 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-4">
              {/* Available Status */}
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? 'text-green-500' : 'text-gray-500'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>

              {/* Doctor Info */}
              <p className="text-gray-900 text-lg font-semibold mt-1 truncate">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-700 px-10 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
