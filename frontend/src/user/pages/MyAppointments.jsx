import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  
  const { backendUrl, token, doctors, getDoctorsData } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[Number(month)]} ${year}`;
  };

  // Fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { atoken: token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { atoken: token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Razorpay init
  const initPay = (order) => {
    const options = {
      key: "rzp_test_ejY2TL7KEDEFjj",
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { atoken: token } }
          );

          if (data.success) {
            toast.success("Payment Successful");
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          toast.error("Payment Failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Payment handler
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { atoken: token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="px-3 sm:px-0">

      <h1 className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</h1>

      <div className="mt-4">
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="flex flex-col sm:flex-row gap-4 py-4 border-b"
              key={index}
            >
              {/* Doctor Image */}
              <div>
                <img
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-md object-cover bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold text-lg">
                  {item.docData.name}
                </p>
                <p className="text-sm">{item.docData.speciality}</p>

                <p className="mt-2 font-medium text-neutral-700">Address:</p>
                <p className="text-xs">{item.docData.address.info.split(",")[0].replace("line1:", "").trim()}</p>
                <p className="text-xs">{item.docData.address.info.split(",")[1].replace("line2:", "").trim()}</p>

                <p className="text-xs mt-2">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {formatDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-2 sm:mt-0 sm:min-w-44">

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="py-2 border rounded bg-indigo-50 text-stone-500">
                    Paid
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="py-2 border rounded text-stone-500 hover:bg-primary hover:text-white transition-all"
                  >
                    Pay here
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="py-2 border rounded text-stone-500 hover:bg-red-600 hover:text-white transition-all"
                  >
                    Cancel appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}

              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 mt-4">No appointments found</p>
        )}
      </div>

    </div>
  );
};

export default MyAppointments;
