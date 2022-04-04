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

export default function EMSGeneralRequests() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");



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
                          setName(name[0].First_name+" "+name[0].Last_name)
                      }else{
                          setData({});
                      }
                  
          
                      return () =>{
                  
                          setData({});
                      };
          
              });


              request_count(user.uid);



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
                if((data[key].Personnel_uid==uid )&& (data[key].Status=="Completed")){
                  fileToShow += "<tr>" +
                  "<td scope='row'>" + data[key].Request_DateTime +'</td>' +
                  "<td>" + data[key].Vehicle_Registration +"</td>" +
                  "<td>" + data[key].Customer_Name +"</td>" +
                  "<td>" + data[key].Destination +"</td>" +
                  "<td>" + data[key].Request_Type +"</td>" +
                  "<td>" + data[key].Reason +"</td>"+
                  "<td>"+"<a class='btn btn-warning' href='/ems/requests/single/"+key+"'>"+"View"+"</a>"+"</td>" +
             
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
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems/requests">
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

            <div>
              <MDBBtnGroup aria-label='Basic example'>
                  <MDBBtn href='/ems/requests' outline color='primary'>
                    Active
                  </MDBBtn>
                  <MDBBtn href='#' active>Completed</MDBBtn>
                </MDBBtnGroup>
              </div>

              <div class="d-flex live align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>INCOMING REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>DateTime</th>
                                        <th scope='col'>Vehicle Registration</th>
                                        <th scope='col'>Customer Name</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Request Type</th>
                                        <th scope='col'>Reason</th>
                                        <th scope='col'>Actions</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id='req'>
                                     
                                      
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