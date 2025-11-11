import NavBar from './components/NavBar';
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import {Route,Routes} from "react-router-dom";
import Footer from "./components/Footer"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
    <ToastContainer/>
     <NavBar/>
      </div>
      
      <div className="flex-1 w-full px-4 sm:px-[10%]">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>


      </Routes>
      </div>
      <div className="w-full">
      <Footer/>

      </div>

    </div>
  );
}

export default App;