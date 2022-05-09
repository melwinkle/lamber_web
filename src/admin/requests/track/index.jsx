/* eslint-disable no-undef */
import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload, FaSquareRootAlt} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, DirectionsService ,DirectionsRenderer,Marker} from '@react-google-maps/api';




export default function ETrackRequest() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const [dest, setDest] = useState("");
const [names, setFull] = useState("");
const [phone, setPhone] = useState("");
const [stat, setStatus] = useState("");
const [approve, setApprove] = useState("");
const [trips, setTripS] = useState("");
const [trip, setTrip] = useState("");
const [hospi, setHosp] = useState("");
const [long, setLong] = useState("");
const [lat, setLat] = useState("");
const params=useParams();
const id=params.id;


const [response,setRes]=useState(null);
const [travelMode,setMode]=useState("DRIVING");
const [origin,setOrigin]=useState("");
const [destination,setDestination]=useState("");
const [distance,setDistance]=useState("");
const [duration,setDuration]=useState("");



const [map, setMap] = useState({});

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
            var dist=name[0].Hospital_location.split(",");
            
            setLat(dist[0]);
      setLong(dist[1]);

      setOrigin(name[0].Hospital_name);

          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
             Info(id);

        }
    })
          
  },[]);

  function Info(uid){
    const dbRef = ref(getDatabase());
          get(child(dbRef, `requests/${uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              const data=snapshot.val();
              setData({request_id:id,Destination:snapshot.val().Destination,status:snapshot.val().Status })
              let fileToShow='';
                setDest(snapshot.val().Destination);
                setFull(snapshot.val().Customer_Name);
                setPhone(snapshot.val().Customer_Number);
                setStatus(snapshot.val().Status);
                setApprove(snapshot.val().Request_approved);
                setTrip(snapshot.val().Arrival);
                setTripS(snapshot.val().Trip);
                setHosp(snapshot.val().Hospital_uid);
                
                setDestination(snapshot.val().Destination);
              console.log(snapshot.val())
              fileToShow+=" Request #"+id+
              "<br>Customer Name:"+snapshot.val().Customer_Name+
             " <br>Destination:"+snapshot.val().Destination+
              "<br>Customer Number:"+snapshot.val().Customer_Number
            
              
             

             if(fileToShow==""){
               document.getElementById("head").innerHTML="No data available"
             }else{
               document.getElementById("head").innerHTML=fileToShow;
             }
    
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
  }
  

 

  function Start(){
    return (
      <div>
        {stat=="Ongoing" &&       
        <div>
          
         <h5>Trip Yet To Start</h5>
        </div> 
          
          } 
      </div>
    );
  }


  function Trip(){
    return (
      <div>
        {stat=="Trip" &&       
        <div>
          <h5>STATUS</h5>
         <h6>Trip Ongoing</h6>
        </div> 
          
          } 
      </div>
    );
  }


  function logout(){
    signOut(auth).then(() => {
      window.location.href='/';
    }).catch((error) => {
    })
  }

  function Mailbox() {
   
    return (
      <div>
        {stat=="Started" &&       
        <div>
          <h6> Trip Started to {dest} at {trips}</h6> 
          <h4>Expected Distance Between Points: {distance} </h4>
          <h4>Expected Time to Destination: {duration} </h4>
        
        </div> 
          
          } 
      </div>
    );
  }



  function Arrive() {
   
    return (
      <div>
        {stat=="Arrived" &&       
        <div>
          <h6> Arrived at {dest}</h6> 
         
        
        </div> 
          
          } 
      </div>
    );
  }

  function Complete() {
   
    return (
      <div>
        {stat=="Completed" &&       
        <div>
          <h6> Trip ended at {trip}</h6> 
         
          
        </div> 
          
          } 
      </div>
    );
  }


  
  


console.log(lat)
const containerStyle = {
  width: '90%',
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
      setDistance(response.routes[0].legs[0].distance.text)
      setDuration(response.routes[0].legs[0].duration.text)
      
    } else {
      console.log('response: ', response)
    }
  }
}


  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/requests">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
                    <Nav.Link href="/admin/finance">Finance</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                      <a href="/admin/profile">{full}</a>
                     <a onClick={()=>logout()} class="logout"> <FiLogOut/></a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div class="states">

                  <MDBBtn href='/admin/requests' active>
                    Back
                  </MDBBtn>

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
                            
                              </LoadScript>
                            </MDBCardText>

                          </MDBCol>
                          <MDBCol class="info">
                
                            <MDBCardTitle id="head">
                             

                            </MDBCardTitle>
                        
                              <MDBCardText id="req">
                              <Start />

                                <Mailbox  />

                                <Arrive  />
                                <Trip/>
                                <Complete  />

                              </MDBCardText>
                         
                         
                  

                          </MDBCol>
                            
                    
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}

