import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {BiHealth} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FaStar} from "react-icons/fa";

export default function EMSDashboard() {

  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const [check, setCheck] = useState(false);
const [req_count, setCount] = useState("");
const [inc_count, setInc] = useState("");
const [can_count, setCnc] = useState(0);


useEffect(()=>{
  auth.onAuthStateChanged(user => {
        if (user) {
          const starCountRef = ref(db, `users/ems/${user.uid}`);
                  onValue(starCountRef, (snapshot) => {
                      const datas = snapshot.val();
                      if(datas!==null){
                          setData({...snapshot.val()})
                          console.log(datas);
                          name.push(snapshot.val());
                          setName(name[0].First_name+" "+name[0].Last_name);
                          if(name[0].Online===1){
                            setCheck(true);
                          }else{
                            setCheck(false);
                          }
                          
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
          
  },);

    
  function request_count(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `requests`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              let fileToShow='';
              let file='';
              console.log(snapshot.val())
              for(var key in data){
                if(data[key].Personnel_uid===uid){
                  setCount(data.length);
                  fileToShow += "<tr>" +
                  "<td scope='row'>" + data[key].Destination +"</td>" +
                  '<td >' + data[key].Customer_Number +'</td>' +
                  "<td>" + data[key].Status +"</td>" +

                  "</tr>";

                }
              document.getElementById("req").innerHTML=fileToShow;
              
              }

              for(var keys in data){
                if(data[keys].Status==="Ongoing"){
                  setInc(data.length);
                }
                if(data[keys].Status==="Cancelled"){
                  setCnc(data.length);
                }
                
                }


                for(var kes in data){
                    file=0;
                    file+=data[kes].Rating;
                    const avg=file/(data.length);
                    console.log("abf",avg);

                  document.getElementById("rat").innerHTML=avg+"/5";
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

  })
}

const checkonline = (e) => {
  const checked = e.target.checked;

  const db = getDatabase();
  const dbRef = ref(db, `users/ems/${user.uid}`);

  if (checked) {
    update(dbRef,{
      Online:1 ,
    }).then(() => {
      console.log("Online");
    }).catch((e) => {
      console.log(e);
    })

  } else {
    update(dbRef,{
      Online:0 ,
    }).then(() => {
      console.log("Offline");
    }).catch((e) => {
      console.log(e);
    })
  }
};
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin"><img src={logo} width="50" height="50" alt=""/>Lamber EMS</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems/dashboard">
                    <Nav.Link href="/ems/dashboard">Home</Nav.Link>
                    <Nav.Link href="/ems/requests">Requests</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                  <Form class="online">
                      <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Online"
                        checked={check}
                        onClick={(e)=>checkonline(e)}
                      />
                    </Form>
                   
                   
                    
                    
                     
                   
                     <a href="/ems/profile">{full}</a>
                     <a onClick={()=>logout()} class="logout" href="#"> <FiLogOut/></a>
                   
                  </Navbar.Text>
                  
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div class="d-flex sum align-items-start mb-3" >
                <MDBCol>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                              <span>{req_count}<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                              <span>{inc_count}<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>INCOMING REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                  <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                            <span>{can_count}<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>CANCELLED REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </div>

              <div class="d-flex live align-items-start mb-3">
                <MDBCol>
                    <MDBCard style={{ maxWidth: '35rem' }}>
                        <MDBCardBody>
                            <MDBCardTitle>LIVE REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Phone Number</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody id="req">
                                    
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn href="/ems/requests">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   

                  <MDBCol>
                    <MDBCard style={{ maxWidth: '35rem' }}>
                        <MDBCardBody>
                            <MDBCardTitle>AVERAGE RATING</MDBCardTitle>
                            <MDBCardText id="rating">
                                <FaStar></FaStar>
                                <h4 id="rat"></h4>
                            </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}