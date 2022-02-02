import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./index.jsx";
import Dashboard from "./admin";
import Register from "./general/register";
import IncomingRequests from "./admin/requests/";
import GeneralRequests from "./admin/requests/general";
import SingleRequest from "./admin/requests/single";
import AllEmployees from "./admin/employees";
import EmployeePost from "./admin/employees/single";
import AddEmployee from "./admin/employees/add";
import Profile from "./admin/profile";

import EMSDashboard from "./ems";
import EMSIncomingRequests from "./ems/requests/";
import EMSGeneralRequests from "./ems/requests/general";
import EMSSingleRequest from "./ems/requests/single";
import EMSProfile from "./ems/profile";


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general" element={<Register />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/requests/" element={<IncomingRequests />} />
        <Route path="/admin/requests/general/" element={<GeneralRequests />} />
        <Route path="/admin/requests/single/" element={<SingleRequest />} />
        <Route path="/admin/employees/" element={<AllEmployees />} />
        <Route path="/admin/employees/single/" element={<EmployeePost />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/employees/add/" element={<AddEmployee />} />

        <Route path="/ems/" element={<EMSDashboard />} />
        <Route path="/ems/requests/" element={<EMSIncomingRequests />} />
        <Route path="/ems/requests/general/" element={<EMSGeneralRequests />} />
        <Route path="/ems/requests/single/" element={<EMSSingleRequest />} />
        <Route path="/ems/profile" element={<EMSProfile/>} />
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
