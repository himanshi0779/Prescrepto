import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(UserContext);
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 px-3 sm:px-6 md:px-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Top Doctors to Book
      </h1>
      <p className="text-sm text-gray-600 text-center sm:w-1/2">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ Responsive Grid */}
      <div className="
        w-full 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-5 
        pt-6
      ">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="
              border 
              border-blue-200 
              rounded-xl 
              overflow-hidden 
              cursor-pointer 
              bg-white
              hover:-translate-y-2 
              transition-all 
              duration-500
              shadow-sm
            "
          >
            <div className="w-full h-48 sm:h-56 bg-blue-50 flex items-center justify-center overflow-hidden">
  <img
    src={item.image}
    alt={item.name}
    className="h-full w-auto object-contain"
  />
</div>

            <div className="p-4">
              {/* Availability Badge */}
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

              {/* Doctor Name */}
              <p className="text-gray-900 text-lg font-semibold mt-1 truncate">
                {item.name}
              </p>

              {/* Speciality */}
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
