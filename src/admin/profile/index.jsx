import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";

export default function Profile() {
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

      //     const starCountRef = ref(db, `hospital/${user.uid}`);
      //     onValue(starCountRef, (snapshot) => {
      //         const data = snapshot.val();
      //         if(data!==null){
      //             setData({...snapshot.val()})
      //             console.log(data);
  
      //         }else{
      //             setData({});
      //         }
          
  
      //         return () =>{
      //             setData({});
      //         };
  
      // })
           
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
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
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
                            <MDBCardTitle>{hospital}
                                <h6>{status}</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <MDBCol><span class="singleh">Registration Date:<span class="singlet">{date}</span></span></MDBCol>
                            <MDBCol><span class="singleh">Location:<span class="singlet"><a href={location}>{location}</a></span></span></MDBCol>
                            <MDBCol><span class="singleh">Email:<span class="singlet">{email}</span></span></MDBCol>
                            <MDBCol><span class="singleh">Phone Number:<span class="singlet">{number}</span></span></MDBCol>
                            </MDBCardText>

                            <MDBBtn href='/admin/profile/update' active>Update</MDBBtn>
                                <MDBBtn href='/admin/requests/general' >Request Termination</MDBBtn>
                            
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}