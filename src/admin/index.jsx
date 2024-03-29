import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../src/App.css";
import Form from "react-bootstrap/Form";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {BiHealth, BiPhoneIncoming} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import{BsReceiptCutoff,BsPeopleFill} from "react-icons/bs";
import { getDatabase, ref, onValue,child, get ,update} from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";


export default function Dashboard() {
  
  const[datas,setData] = useState({});
  const name=[];
  const requests=[];
  const incoming=[];
  const employee=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [check, setCheck] = useState(false);
const [hospital, setName] = useState("");
const [req_count, setCount] = useState("");
const [inc_count, setInc] = useState("");
const [emp_count, setEmp] = useState("");
  
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
              if(name[0].Online==1){
                setCheck(true);
              }else{
                setCheck(false);
              }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

          request_count(user.uid);
          employee_count(user.uid);

        }
    })
          
  },[]);


  function request_count(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `requests`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              let fileToShow='';
              console.log(snapshot.val())
              for(var key in data){
                if(data[key].Hospital_uid==uid){
                  requests.push(data);
              
                  fileToShow += "<tr>" +
                  "<td scope='row'>" + data[key].Personnel +"</td>" +
                  '<td >' + data[key].Destination +'</td>' +
                  "<td>" + data[key].Status +"</td>" +

                  "</tr>";

                }
                setCount(requests.length);
              document.getElementById("req").innerHTML=fileToShow;
              
              }

              for(var keys in data){
                if(data[key].Hospital_uid==uid && data[keys].Status=="Pending"){
                  incoming.push(data);
                 
                }
                setInc(incoming.length);
                
                }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

  }

  function employee_count(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `users/ems/`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              let fileToShow='';
             
              for(var key in data){
                
              
                if(data[key].Hospital_uid==uid){
                 employee.push(data);
                  fileToShow += "<tr>" +
                  "<td scope='row'>" + data[key].First_name +" "+data[key].Last_name+"</td>" +
                  '<td >' + data[key].Role +'</td>' +
                  "<td>" + data[key].Status +"</td>" +

                  "</tr>";
          
                  

                }
                setEmp(employee.length)
              document.getElementById("emp").innerHTML=fileToShow;
              
              }

             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

  }
    
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

          

            <div class="d-flex sum align-items-start mb-3" >
                <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardText>
                              <span>{req_count}<BsReceiptCutoff/></span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardText>
                              <span>{inc_count}<BiPhoneIncoming/></span>
                            </MDBCardText>
                            <MDBCardTitle>INCOMING REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                  <MDBCard >
                        <MDBCardBody>
                            <MDBCardText>
                              <span>{emp_count}<BsPeopleFill/></span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL EMPLOYEES</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </div>

              <div class="d-flex live align-items-start dash mb-3">
                <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>LIVE REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Personnel</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="req">
                                     
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn href="/admin/requests">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   

                  <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>EMPLOYEE COUNT</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Personnel</th>
                                        <th scope='col'>Role</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="emp">
                                      
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn  href="/admin/employees">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}