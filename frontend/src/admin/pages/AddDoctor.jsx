import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!docImg) return toast.error('Image Not Selected');

    try {
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-4 sm:m-6 w-full flex justify-center'>
      <div className='w-full max-w-4xl bg-white border rounded-lg p-6 sm:p-8 shadow-md'>
        <h2 className='text-xl sm:text-2xl font-semibold mb-6 text-gray-700'>Add Doctor</h2>

        {/* Image upload */}
        <div className='flex flex-col sm:flex-row items-center gap-4 mb-6 text-gray-600'>
          <label htmlFor="doc-img">
            <img
              className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 cursor-pointer object-cover'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
          <p className='text-sm sm:text-base'>Upload doctor picture</p>
        </div>

        {/* Form fields */}
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label>Doctor Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Name'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label>Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='border rounded px-3 py-2 w-full'
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label>Fees</label>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                type='number'
                placeholder='Fees'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label>Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className='border rounded px-3 py-2 w-full'
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label>Education</label>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                type='text'
                placeholder='Education'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label>Address</label>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                type='text'
                placeholder='Address 1'
                className='border rounded px-3 py-2 w-full'
                required
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type='text'
                placeholder='Address 2'
                className='border rounded px-3 py-2 w-full'
                required
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className='flex flex-col gap-1 mt-6'>
          <label>About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Write about doctor'
            className='border rounded px-3 py-2 w-full'
            rows={5}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type='submit'
          className='mt-6 w-full sm:w-auto bg-[#5F65FF] text-white px-6 py-2 rounded-full hover:bg-[#4a54cc] transition'
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
