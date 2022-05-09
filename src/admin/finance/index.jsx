import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../src/App.css";
import Form from "react-bootstrap/Form";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {BiDollarCircle, BiHealth, BiMoney} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import { getDatabase, ref, onValue,child, get ,update} from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";

export default function Finance() {
  
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


          employee_count(user.uid);

  
        }
    })
          
  },[]);




  function employee_count(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `requests/`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              let fileToShow='';
                
             var sum=0;
              for(var key in data){
                
              
                if(data[key].Hospital_uid==uid){
                 employee.push(data);
                  fileToShow += "<tr>" +
                  "<td scope='row'>" + data[key].Customer_Name +'</td>'+
                  '<td >' + data[key].Destination +'</td>' +
                  '<td >' + data[key].Request_DateTime +'</td>' +
                  "<td>" + data[key].Amount +"</td>" +
                  "<td>" + data[key].Payment_Status +"</td>" +

                  "</tr>";
          
                  sum+=data[key].Amount;

                  

                }
                
                setEmp(sum);
                setInc(data[key].Account)
              document.getElementById("req").innerHTML=fileToShow;
              
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
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/finance">
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
                              <span>GHC {emp_count}.00</span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL FINANCES <BiDollarCircle/></MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                      
                            
                            <MDBCardText>
                            <span>{inc_count}</span>
                            </MDBCardText>
                            <MDBCardTitle> PayStack Account <BiMoney/></MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                 
              </div>

              <div class="d-flex live align-items-start mb-3 finance">

                    <MDBCard > 
                        <MDBCardBody>
                            <MDBCardTitle>Tracking Expenses</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Customer Name</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Request Date</th>
                                        <th scope='col'>Charge</th>
                                        <th scope='col'>Status</th>
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="req">
                                     
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
  

                   
              </div>
        </div>
  );
}