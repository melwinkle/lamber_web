import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import Form from "react-bootstrap/Form";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup, MDBInput } from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DeclineRequests() {
    const Swal = require('sweetalert2')
    const params=useParams();
    const name=[];
    const id=params.id;
    const db = getDatabase();
    const auth = getAuth();
    const[data,setData] = useState({});
    const [ems, setFirst] = useState("");
    const [fname, setLast] = useState("");
    const [lname, setLastN] = useState("");
    const [hospital, setName] = useState("");
    const [destination, setDest] = useState("");
    const [location, setloc] = useState("");
    const [hid, setID] = useState("");
    // const [username, setUser] = useState("");
   


    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
              const dbRef = ref(getDatabase());
              get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
                
                if (snapshot.exists()) {
                  console.log(snapshot.val())
                  name.push(snapshot.val())
                  setName(name[0].Hospital_name);
                  setloc(name[0].Hospital_location);
                  setID(user.uid);
      
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });

           cancel();

          

               
            }
        })
              
      },[]);
        
      function cancel(){
        const db = getDatabase();
        const dbRef = ref(db, `requests/${id}`);
        Swal.fire({
            title: 'Are you sure you want to decline #'+ id+' request?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Decline!'
          }).then((result) => {
            if (result.isConfirmed) {
                update(dbRef,{
                    Status:"Cancelled",
                    Hospital_name:hospital,
                    Hospital_location:location,
                    Hospital_uid:hid,
                    }).then(() => {
                    console.log("Cancelled");
                    window.location.href="/admin/requests";
                    }).catch((e) => {
                        console.log(e);
                    })
               
            }
          })

}
 
      function logout(){
        signOut(auth).then(() => {
          window.location.href='/';
        }).catch((error) => {
          // An error happened.
        })
      }
      
    return(
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/requests">
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

        </div>

    );
}