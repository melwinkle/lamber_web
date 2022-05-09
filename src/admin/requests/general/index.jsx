import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup } from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";

export default function GeneralRequests() {
  const[datas,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [hospital, setName] = useState("");


  
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
  
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
          request_count(user.uid);
 
           
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
function request_count(uid){
  const dbRef = ref(getDatabase());
        get(child(dbRef, `requests`)).then((snapshot) => {
          
          if (snapshot.exists()) {
            const data=snapshot.val();
            let fileToShow='';
            console.log(snapshot.val())
            for(var key in data){
              if((data[key].Hospital_uid==uid )&& (data[key].Status=="Completed")){
                fileToShow += "<tr>" +
                "<td scope='row'>" + data[key].Request_DateTime +'</td>' +
                "<td>" + data[key].Personnel +"</td>" +
                "<td>" + data[key].Vehicle_Registration +"</td>" +
                "<td>" + data[key].Customer_Name +"</td>" +
                "<td>" + data[key].Destination +"</td>" +
                "<td>" + data[key].Request_Type +"</td>" +
                "<td>" + data[key].Reason +"</td>" +
                "<td>" + data[key].Status +"</td>" +
                "<td>"+"<a class='btn-warning' href='/admin/requests/single/"+key+"'>"+"<i class='gg-eye'></i>"+"</button>"+"</td>" +
           
                "</tr>";

              }

              if(fileToShow==""){
                document.getElementById("req").innerHTML="<tr><td colspan='9'>No data available</td></tr>"
              }else{
                document.getElementById("req").innerHTML=fileToShow;
              }
           
            
            }

          
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

}
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
               <Navbar.Brand href="#admin"><img src={logo} width="50" height="50" alt=""/>Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/requests">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
                    <Nav.Link href="/admin/finance">Finance</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <a href="#profile">{hospital}</a>
                     <a  class="logout" onClick={()=>logout()}> <FiLogOut/></a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div class="state">
              <MDBBtnGroup aria-label='Basic example'>
                  <MDBBtn href='/admin/requests' outline color='primary'>
                    Active
                  </MDBBtn>
                  <MDBBtn href='#' active>Completed</MDBBtn>
                </MDBBtnGroup>
              </div>

              <div class="d-flex live align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>COMPLETED REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                    <tr>
                                        <th scope='col'>DateTime</th>
                                        <th scope='col'>Personnel</th>
                                        <th scope='col'>Vehicle Registration</th>
                                        <th scope='col'>Customer Name</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Request Type</th>
                                        <th scope='col'>Reason</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Actions</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="req">
                              
                                      
                                      
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn>View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}