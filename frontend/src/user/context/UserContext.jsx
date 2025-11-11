import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const UserContext=createContext();

const UserContextProvider=(props)=>{

    const currencySymbol='$'
    const backendUrl=process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
    const [doctors,setDoctors]=useState([])
    const [token,setToken]= useState(()=>localStorage.getItem('token') || null)
    const [userData,setUserData]=useState(null)
    const [loadingUser, setLoadingUser] = useState(false);

    const getDoctorsData= async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message || "Failed to fetch doctors");
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData=async()=>{
        if (!token) return setUserData(false);

        setLoadingUser(true);
        try{
            const {data}=await axios.get(backendUrl+ '/api/user/get-profile',{headers:{atoken:token}})
            if(data.success){
                setUserData(data.userData)
            }
            else{
                setToken(null);
                localStorage.removeItem('token')
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            setToken(null)
            toast.error(error.message)
            setUserData(false)

        }
        finally {
            setLoadingUser(false);
        }
    }

    useEffect(()=>{
        getDoctorsData();
    },[])

    useEffect(()=>{
        loadUserProfileData()
    },[token]);
    const value= {
        doctors, getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;