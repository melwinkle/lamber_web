import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup,MDBInput} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";

export default function AProfileUpdate() {
  const[datas,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [hospital, setName] = useState("");
const [date, setDate] = useState("");
const [location, setLocation] = useState("");
const [number, setNumber] = useState("");
const [status, setStatus] = useState("");
const [email, setEmail] = useState("");

const onChangeHandler = (fieldName, value)=>{
 
  
  if(fieldName==="name"){
    setName(value);
  }
  else if(fieldName==="location"){
    setLocation(value);
  }
  else if(fieldName==="phone"){
    setNumber(value);
  }

}



useEffect(()=>{
  auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(getDatabase());
          get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              console.log(snapshot.val())
              name.push(snapshot.val())
              setData({datas:name});
              setName(name[0].Hospital_name);
              setDate(name[0].Hospital_date);
              setLocation(name[0].Hospital_location);
              setNumber(name[0].Hospital_number);
              setStatus(name[0].Status);
              setEmail(name[0].Hospital_email);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

           
        }
    })
          
  },[]);

    
function logout(){
  signOut(auth).then(() => {
    window.location.href='/';
  }).catch((error) => {
    // An error happened.
  })
}

const handleSubmit = (e)=>{
  e.preventDefault();

  const db = getDatabase();
  const dbRef = ref(db, `hospital/${user.uid}`);
  update(dbRef,{
  Hospital_name: hospital,
  Hospital_number: number,
  Hospital_location:location
}).then(() => {
  console.log("Data updated");
  window.location.href='/admin/profile';
}).catch((e) => {
  console.log(e);
})

}
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
               <Navbar.Brand href="#admin"><img src={logo} width="50" height="50" alt=""/>Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
                    <Nav.Link href="/admin/finance">Finance</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <a href="/admin/profile">{hospital}</a>
                     <a  class="logout" onClick={()=>logout()}> <FiLogOut/></a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>


              <div class="d-flex profile align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>
                              {hospital}
                                <h6>{status.toUpperCase()}</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                        

                            <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4'  id='form1' type='text' label="Company Name" value={hospital}onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                            <MDBInput className='mb-4' id='form2' type='text' label="Company Location"  value={location}onChange={(e)=>{ onChangeHandler("location",e.target.value)}}/>
                            <MDBInput  className='mb-4' label='Phone number input' id='typePhone' type='tel' value={number}onChange={(e)=>{ onChangeHandler("phone",e.target.value)}} />
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' value={email} readonly/>
                           


                            
                            

                            <MDBBtn type='submit' className='mb-4' block>
                                Update
                            </MDBBtn>

                          
                        </form>
                        </MDBCardText>
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}