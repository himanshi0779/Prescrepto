import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext= createContext()

const DoctorContextProvider=(props)=>{

    const backendUrl=process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
    const [dToken, setDToken]=useState( localStorage.getItem('dToken') || null)
    const [appointments, setAppointments]=useState([])
    const [dashData, setDashData]=useState(null)
    const [profileData,setProfileData]=useState(null)

    const getAppointments=async()=>{
        try{
            const {data} = await axios.get(backendUrl+'/api/doctor/appointments',{headers:{atoken:dToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const completeAppointment= async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{atoken:dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else{
                toast.error(data.message)
            }
        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{atoken:dToken}});
            if(data.success){
                setDashData(data.dashData)
            } else{
                toast.error(data.message)
            }
        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{atoken:dToken}})
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    const getProfileData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{atoken:dToken}})
            console.log("Fetched Profile Data:", data.profileData);
            if(data.success){
                setProfileData(data.profileData)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const value={
        dToken, setDToken,
        backendUrl,appointments,
        setAppointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
 
export default DoctorContextProvider