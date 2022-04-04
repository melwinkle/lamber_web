import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup } from 'mdb-react-ui-kit';
import {FaEye, FaPlus} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";


export default function AllEmployees() {
  const[datas,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [hospital, setName] = useState("");

const employee=[];
  
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

          employee_count(user.uid);
           
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
                "<td scope='row'>" + data[key].First_name +" "+ data[key].Last_name+"</td>" +
                '<td >' + data[key].Number +'</td>' +
                "<td>" + data[key].Role +"</td>" +
                "<td>" + data[key].Status +"</td>" +
                "<td>"+"<a class='btn-warning' href='/admin/employees/single/"+key+"'>"+"<i class='gg-eye'></i></a>"+"</td>" +
                "</tr>";
        
           

              }
    
              if(fileToShow==""){
                document.getElementById("emp").innerHTML="<tr><td colspan='5'>No data available</td></tr>"
              }else{
                document.getElementById("emp").innerHTML=fileToShow;
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
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/employees">
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

            
            <div class="states">
            <MDBBtn href="/admin/employees/add"active>Add New Employee <FaPlus/></MDBBtn>
            </div>
              <div class="d-flex live align-items-start mb-3">
                <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>EMPLOYEES</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Full Name</th>
                                        <th scope='col'>Phone Number</th>
                                        <th scope='col'>User Role</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Actions</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="emp">
                                    
                                      
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