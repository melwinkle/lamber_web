import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";
import { useParams } from 'react-router-dom';


export default function EMSTrackRequest() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const params=useParams();
const id=params.id;

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


              request_count(id);



        }
    })
          
  },[]);
  function request_count(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `requests/${uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              let fileToShow='';
              console.log(snapshot.val())
     
               
                  fileToShow = 
                  "<MDBCardTitle>REQUEST #"+ uid +
                  "<h6>"+snapshot.val().Request_DateTime+"</h6>"+
                  "<h6>PERSONNEl:"+snapshot.val().Personnel+"</h6>"+
                  "<h6>VEHICLE RN:"+snapshot.val().Vehicle_Registration+"</h6>"+
              "</MDBCardTitle>"+
             " <MDBCardText>"+
                  
              "<MDBCol><span class='singleh'>Customer Name:<span class='singlet'>"+snapshot.val().Customer_Name+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Customer Number:<span class='singlet'>"+snapshot.val().Customer_Number+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Pick-Up Time:<span class='singlet'>"+snapshot.val().Pick_Up_Time+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Trip Length:<span class='singlet'>"+snapshot.val().Trip+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Reason:<span class='singlet'>"+snapshot.val().Reason+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Request Time:<span class='singlet'>"+snapshot.val().Request_DateTime+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Request Approved:<span class='singlet'>"+snapshot.val().Request_Approved+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Rating:<span class='singlet'>"+snapshot.val().Rating+"/5</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Audio:<span class='singlet'>"+snapshot.val().Audio+"</span></span></MDBCol><br>"+
             " </MDBCardText>"+
              "<MDBBtn class='btn btn-success'>Download<FaDownload/></MDBBtn>";
                
  
                if(fileToShow==""){
                  document.getElementById("req").innerHTML="<tr><td colspan='9'>No data available</td></tr>"
                }else{
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
                <Navbar.Brand href="#admin">Lamber EMS</Navbar.Brand>
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
                  <MDBBtn href='/ems/requests' active>
                    Back
                  </MDBBtn>
                </MDBBtnGroup>
              </div>

              <div class="d-flex single align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                          <MDBCol>
                          <MDBCardText className="snap">
                              <img
                                src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                                className='img-thumbnail'
                                alt='...'
                                style={{ maxWidth: '26rem' }}
                              />
                            </MDBCardText>

                          </MDBCol>
                          <MDBCol id="req">
                         

                          </MDBCol>
                            
                    
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}