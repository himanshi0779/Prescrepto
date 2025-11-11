import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(UserContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality && doctors.length > 0) {
      const filtered = doctors.filter((doc) =>
        doc.speciality?.toLowerCase().includes(speciality.toLowerCase())
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-5">

      {/* TOP TEXT */}
      <p className="text-gray-600 text-sm sm:text-base">
        Browse through the doctors specialists.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        {/* Mobile Filter Toggle */}
        <button
          className={`py-1 px-3 border rounded text-sm sm:hidden transition-all ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* FILTER PANEL */}
        <div
          className={`flex-col gap-3 text-sm text-gray-600 w-full sm:w-60 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map((spec, idx) => (
            <p
              key={idx}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-full pl-3 py-1.5 border border-gray-300 rounded cursor-pointer transition-all ${
                speciality === spec ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* DOCTOR GRID */}
        <div
          className="
            flex-1
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-5
          "
        >
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="
                  border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                  hover:-translate-y-2 transition-all duration-500 bg-white
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

                  <p className="text-gray-900 text-lg font-semibold mt-1">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full mt-4">No doctors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
