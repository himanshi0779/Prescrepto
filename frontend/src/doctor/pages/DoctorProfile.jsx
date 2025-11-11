import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../../AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return <p className="p-5">Loading profile...</p>;

  const line1 = profileData.address?.info.split(',')[0]?.replace('line1:', '').trim();
  const line2 = profileData.address?.info.split(',')[1]?.replace('line2:', '').trim();

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { aToken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 m-4 sm:m-5">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          className="w-40 h-40 sm:w-60 sm:h-60 object-cover rounded-lg bg-gray-100"
          src={profileData.image}
          alt={profileData.name}
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col gap-6 border border-stone-100 rounded-lg p-4 sm:p-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl sm:text-3xl font-medium text-gray-700">{profileData.name}</p>
            <div className="flex flex-wrap gap-2 mt-1 text-gray-600">
              <p>{profileData.degree} - {profileData.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{profileData.experience}</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-600 font-medium">
              Appointment fee: <span className="text-gray-800">
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData(prev => ({ ...prev, fees: Number(e.target.value) }))
                    }
                    className="border rounded px-2 py-1 w-24 sm:w-32"
                  />
                ) : (
                  `${currency} ${profileData.fees}`
                )}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))
                }
              />
              <label>Available</label>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-sm font-medium text-neutral-800">About:</p>
          <p className="text-sm text-gray-600 mt-1">{profileData.about || assets.about}</p>
        </div>

        {/* Address */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <p className="font-medium">Address:</p>
          <div className="flex flex-col gap-1">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={line1}
                  onChange={(e) =>
                    setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                  }
                  className="border rounded px-2 py-1 w-full sm:w-64"
                />
                <input
                  type="text"
                  value={line2}
                  onChange={(e) =>
                    setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                  }
                  className="border rounded px-2 py-1 w-full sm:w-64"
                />
              </>
            ) : (
              <p className="text-sm">{line1 || 'N/A'}<br />{line2 || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div>
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-2 border border-blue-900 text-sm rounded-full mt-3 hover:bg-blue-900 hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 border border-blue-900 text-sm rounded-full mt-3 hover:bg-blue-900 hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
