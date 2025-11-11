import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(UserContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { atoken: token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg w-full flex flex-col gap-4 p-3 sm:p-0 text-sm">

        {/* -------- Profile Image -------- */}
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer self-center sm:self-start">
            <div className="relative inline-block">
              <img
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-blue-300"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="profile"
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-2 right-2 opacity-70"
                  src={assets.upload_icon}
                  alt=""
                />
              )}
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover self-center sm:self-start"
            src={userData.image}
            alt=""
          />
        )}

        {/* -------- Name -------- */}
        {isEdit ? (
          <input
            className="bg-gray-50 text-2xl sm:text-3xl font-medium mt-2 border rounded p-1"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-2xl sm:text-3xl text-neutral-800 mt-2">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-300 h-px border-none mt-4" />

        {/* -------- Contact Information -------- */}
        <div>
          <p className="text-neutral-500 underline mt-4">CONTACT INFORMATION</p>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700">

            <p className="font-medium">Email:</p>
            <p className="text-blue-500 break-all">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 rounded p-1 max-w-full"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="bg-gray-100 rounded p-1"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="bg-gray-100 rounded p-1"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* -------- Basic Info -------- */}
        <div>
          <p className="text-neutral-500 underline mt-4">BASIC INFORMATION</p>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700">

            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 rounded p-1 w-28"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-500">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 rounded p-1 w-40"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-500">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* -------- Buttons -------- */}
        <div className="mt-6">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
