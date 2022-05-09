import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./index.jsx";
import Dashboard from "./admin";
import Register from "./general/register/register";
import AForgot from './general/password';

import IncomingRequests from "./admin/requests/";
import GeneralRequests from "./admin/requests/general";
import SingleRequest from "./admin/requests/single";
import AcceptRequests from "./admin/requests/accept";
import DeclineRequests from "./admin/requests/decline";
import ATrackRequest from "./admin/requests/track";
import AllEmployees from "./admin/employees";
import EmployeePost from "./admin/employees/single";
import AddEmployee from "./admin/employees/add";
import Profile from "./admin/profile";
import AProfileUpdate from "./admin/profile/update";
import AddBank from './admin/profile/account';
import Finance from './admin/finance';




function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general/register/" element={<Register />} />
        <Route path="/general/password/" element={<AForgot />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/requests/" element={<IncomingRequests />} />
        <Route path="/admin/requests/general/" element={<GeneralRequests />} />
        <Route path="/admin/requests/single/:id" element={<SingleRequest />} />
        <Route path="/admin/requests/track/:id" element={<ATrackRequest />} />
        <Route path="/admin/requests/accept/:id" element={<AcceptRequests />} />
        <Route path="/admin/requests/decline/:id" element={<DeclineRequests />} />
        <Route path="/admin/employees/" element={<AllEmployees />} />
        <Route path="/admin/employees/single/:id" element={<EmployeePost />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/profile/update" element={<AProfileUpdate />} />
        <Route path="/admin/profile/account" element={<AddBank />} />
        <Route path="/admin/employees/add/" element={<AddEmployee />} />
        <Route path="/admin/finance/" element={<Finance />} />

    
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
