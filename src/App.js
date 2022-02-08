import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./index.jsx";
import AHome from "./general";
import Dashboard from "./admin";
import Register from "./general/register/register";
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

import EHome from "./ems";
import EMSDashboard from "./ems/dashboard";
import EMSIncomingRequests from "./ems/requests/";
import EMSGeneralRequests from "./ems/requests/general";
import EMSSingleRequest from "./ems/requests/single";
import EMSTrackRequest from "./ems/requests/track";
import EMSProfile from "./ems/profile";
import ProfileUpdate from "./ems/profile/update";


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general/" element={<AHome />} />
        <Route path="/general/register/" element={<Register />} />
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
        <Route path="/admin/employees/add/" element={<AddEmployee />} />

        <Route path="/ems/" element={<EHome />} />
        <Route path="/ems/dashboard" element={<EMSDashboard />} />
        <Route path="/ems/requests/" element={<EMSIncomingRequests />} />
        <Route path="/ems/requests/general/" element={<EMSGeneralRequests />} />
        <Route path="/ems/requests/single/:id" element={<EMSSingleRequest />} />
        <Route path="/ems/requests/track/:id" element={<EMSTrackRequest />} />
        <Route path="/ems/profile" element={<EMSProfile/>} />
        <Route path="/ems/profile/update" element={<ProfileUpdate/>} />
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
