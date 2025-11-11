import {  Routes, Route } from "react-router-dom";
import UserApp from "./user/UserApp";
import AdminApp from "./admin/AdminApp";
import DoctorApp from "./doctor/DoctorApp";
import AdminLogin from "./Login"
import DoctorLogin from "./Login"
import UserLogin from "./user/pages/UserLogin"
import { Navigate } from "react-router-dom";

function App() {
  return (
      <Routes>

        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/doctor/login" element={<DoctorLogin/>}/> 


        <Route path="/admin/*" element={<AdminApp />}/>
        <Route path="/doctor/*" element={<DoctorApp />} />
        <Route path="/*" element={<UserApp />} />
        


      </Routes>
  );
}

export default App;
