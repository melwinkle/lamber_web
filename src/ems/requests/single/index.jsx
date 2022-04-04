import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../../images/lamber_logo.png';
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
import { GoogleMap, LoadScript, DirectionsService ,DirectionsRenderer,Marker} from '@react-google-maps/api';

export default function EMSSingleRequest() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const params=useParams();
const id=params.id;
const [long, setLong] = useState("");
const [lat, setLat] = useState("");

const [response,setRes]=useState(null);
const [travelMode,setMode]=useState("DRIVING");
const [origin,setOrigin]=useState("");
const [destination,setDestination]=useState("");
// const axios = require('axios');
const [distance,setDistance]=useState("");
const [duration,setDuration]=useState("");

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
              hosp(snapshot.val().Hospital_uid);
              setDestination(snapshot.val().Destination);
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
              "<MDBCol><span class='singleh'>Request Approved:<span class='singlet'>"+snapshot.val().Request_approved+"</span></span></MDBCol><br>"+
              "<MDBCol><span class='singleh'>Trip Ended:<span class='singlet'>"+snapshot.val().Arrival+"</span></span></MDBCol><br>"+
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
  function hosp(uid){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `hospital/${uid}`)).then((snapshot) => {
      
      if (snapshot.exists()) {
        console.log(snapshot.val())
        // const latitude=snapshot.val().Hospital_location.split(",").at(0);
        // const longitude=snapshot.val().Hospital_location.split(",").at(1);
       
       
  
        setLat(snapshot.val().Hospital_location.split(",").at(0));
        setLong(snapshot.val().Hospital_location.split(",").at(1));
  
        setOrigin(snapshot.val().Hospital_name);
  
  
  
  } else {
    console.log("No data available");
  }
  }).catch((error) => {
  console.error(error);
  });
  
  }

  console.log(lat);
  const containerStyle = {
    width: '30rem',
    height: '30rem'
  };
  
  const center = {
  
    lat:  parseFloat(lat),
    lng: parseFloat(long)
  };
  function directionsCallback (response) {
    console.log(response)
  
    if (response !== null) {
      if (response.status === 'OK') {
        setRes(response);
      } else {
        console.log('response: ', response)
      }
    }
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
                          <MDBCardText class="snap" id="map">
                          <LoadScript
                                googleMapsApiKey="AIzaSyCaG0u5EfOCiQTSWQyEia2HBbhl3wxcB-g"
                              >
                              <GoogleMap
                                  // required
                                  id='direction-example'
                                  // required
                                  mapContainerStyle={containerStyle}
                                  // required
                                  zoom={2}
                                  // required
                                  center={center}
                                  // optional
                                 
                                >
                                  {
                                    (
                                    destination !== '' &&
                                      origin !== ''
                                    ) && (
                                      <DirectionsService
                                        // required
                                        options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                          destination: destination,
                                          origin: origin,
                                          travelMode: travelMode,
                                      
                                        }}
                                        // required
                                        callback={directionsCallback}
                                    
                                       
                                      />
                                    )
                                  }

                                  {
                                    response !== null && (
                                      <DirectionsRenderer
                                        // required
                                        options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                                          directions: response
                                        }}
                                       
                                      />
                                    )
                                  }

                                  {
                                            !destination && !origin && (
                                              <Marker
                                                label='A'
                                                position={
                                                  center
                                                }
                                              >
                                              </Marker>
                                            )
                                          }
                                </GoogleMap>
                                {/* <GoogleMap
                                  mapContainerStyle={containerStyle}
                                  center={center}
                                  zoom={10}
                                >
                 
                                  <></>
                                </GoogleMap> */}
                              </LoadScript>
                            </MDBCardText>

                          </MDBCol>

                
                          <MDBCol class="info" >
                          <MDBCardText id="req">
                          </MDBCardText>

                          </MDBCol>
                            
                    
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}