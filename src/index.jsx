import React, {useState , useEffect} from 'react';
import "../src/App.css";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle, MDBBtnGroup
  } from 'mdb-react-ui-kit';


const Home=()=>{
    
    return(

       

       <div class="interface">
  
           <MDBBtn href="/ems" class='ems'>EMS</MDBBtn>
          <MDBBtn href="/general" class='admin'>HOSPITAL</MDBBtn>

       </div>
       

    )
}

export default Home;