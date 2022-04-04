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

// const ScriptLoaded = require("../../../../node_modules/@react-google-maps/api/src/docs/ScriptLoaded.tsx").default;
// const ScriptLoaded = require("./docs/ScriptLoaded").default;
// import axios from 'axios';

export default function EMSTrackRequest() {
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
// const axios = require('axios');
const [distance,setDistance]=useState("");
const [duration,setDuration]=useState("");
// const config = {
//   method: 'get',
//   url: 'https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCaG0u5EfOCiQTSWQyEia2HBbhl3wxcB-g',
//   headers: { }
// };


const [map, setMap] = useState({});

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
                          setName(name[0].First_name+" "+name[0].Last_name)
                      }else{
                          setData({});
                      }
                  
          
                      return () =>{
                  
                          setData({});
                      };
          
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
                hosp(snapshot.val().Hospital_uid);
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
  

  function RequestStart(){

    const db = getDatabase();
    const dbRef = ref(db, `requests/${id}`);

    update(dbRef,{
      Status:"Started",
      Trip:Date().toLocaleString()
    }).then(() => {
      console.log("Started");
      window.location.reload();
    }).catch((e) => {
      console.log(e);
    });

  

              
             
  
  }

  function Start(){
    return (
      <div>
        {stat=="Ongoing" &&       
        <div>
          
          <MDBBtn onClick={()=>RequestStart()}>Start Trip</MDBBtn>
        </div> 
          
          } 
      </div>
    );
  }


  function request_arrive(){
  
     
    const db = getDatabase();
  const dbRef = ref(db, `requests/${id}`);

  update(dbRef,{
    Status:"Completed",
    Arrival:Date().toLocaleString(),
  }).then(() => {
    console.log("Completed");
    window.location.reload();
  }).catch((e) => {
    console.log(e);
  })
   
    
   

}

function request_end(){
  
  const db = getDatabase();
  const dbRef = ref(db, `requests/${id}`);

  update(dbRef,{
    Status:"Arrived"
  }).then(() => {
    console.log("Arrived");
    window.location.reload();
  }).catch((e) => {
    console.log(e);
  })


}
  function logout(){
    signOut(auth).then(() => {
      window.location.href='/';
    }).catch((error) => {
      // An error happened.
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
          <MDBBtn onClick={()=>request_end()}>Destination Arrived</MDBBtn>
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
          <h4>Time Spent</h4>
          <h1>04:00</h1> 
          <MDBBtn onClick={()=>request_arrive()}>Completed</MDBBtn>
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
          <h4>Time Spent</h4>
          <h1>30 minutes</h1> 
          
        </div> 
          
          } 
      </div>
    );
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
console.log(lat)
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
                          <MDBCol class="info">
                
                            <MDBCardTitle id="head">
                             

                            </MDBCardTitle>
                        
                              <MDBCardText id="req">
                              <Start />

                            
                                <Mailbox  />

                                <Arrive  />
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

