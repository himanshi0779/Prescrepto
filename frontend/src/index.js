import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from 'react-router-dom'
import UserContextProvider from "./user/context/UserContext";
import AppContextProvider from "./AppContext";
import DoctorContextProvider from "./doctor/context/DoctorContext";
import AdminContextProvider from "./admin/context/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <UserContextProvider>
    <AppContextProvider>
      <DoctorContextProvider>
        <AdminContextProvider>
         <App/>
        </AdminContextProvider>
      </DoctorContextProvider>
    </AppContextProvider>
  </UserContextProvider>
  </BrowserRouter>
);

