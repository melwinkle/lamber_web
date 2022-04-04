import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";

export default function EMSProfile() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const [status, setStatus] = useState("");
const [hospital, setHospital] = useState("");
const [phone, setPhone] = useState("");
const [role, setRole] = useState("");
const [email, setEmail] = useState("");
useEffect(()=>{
  auth.onAuthStateChanged(user => {
        if (user) {
          // const dbRef = ref(getDatabase());
          // get(child(dbRef, `users/ems/${user.uid}`)).then((snapshot) => {
            
          //   if (snapshot.exists()) {
          //     console.log(snapshot.val())
          //     name.push(snapshot.val())
          //     setData({...snapshot.val()})
          //       console.log(name)
              
          //   } else {
          //     console.log("No data available");
          //   }
          // }).catch((error) => {
          //   console.error(error);
          // });

      
          const starCountRef = ref(db, `users/ems/${user.uid}`);
                  onValue(starCountRef, (snapshot) => {
                      const datas = snapshot.val();
                      if(datas!==null){
                          setData({...snapshot.val()})
                          console.log(datas);
                          name.push(snapshot.val());
                          setName(name[0].First_name+" "+name[0].Last_name);
                          setStatus(name[0].Status);
                          setHospital(name[0].Hospital);
                          setRole(name[0].Role);
                          setPhone(name[0].Number);
                          setEmail(name[0].Email);
                      }else{
                          setData({});
                      }
                  
          
                      return () =>{
                  
                          setData({});
                      };
          
              })
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
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber EMS</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems/dashboard">
                    <Nav.Link href="/ems/dashboard">Home</Nav.Link>
                    <Nav.Link href="/ems/requests">Requests</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <a href="/ems/profile">{full}</a>
                     <a onClick={()=>logout()} class="logout"> <FiLogOut/></a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>


              <div class="d-flex profile align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>{full}
                                <h6>{status}</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <MDBCol><span class="singleh">Hospital:<span class="singlet">{hospital}</span></span></MDBCol>
                            <MDBCol><span class="singleh">Phone:<span class="singlet">{phone}</span></span></MDBCol>
                            <MDBCol><span class="singleh">Email:<span class="singlet">{email}</span></span></MDBCol>
                            <MDBCol><span class="singleh">Role:<span class="singlet">{role}</span></span></MDBCol>
                            </MDBCardText>

                            <MDBBtn href='/ems/profile/update' active>Update</MDBBtn>
                                <MDBBtn href='/ems/profile/general' >Request Termination</MDBBtn>
                            
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}