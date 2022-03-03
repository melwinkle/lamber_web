import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import Form from "react-bootstrap/Form";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup, MDBInput } from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";
import { useParams } from 'react-router-dom';

export default function AcceptRequests() {
    const params=useParams();
    const name=[];
    const id=params.id;
    const db = getDatabase();
    const auth = getAuth();
    const[data,setData] = useState({});
    const [ems, setFirst] = useState("");
    const [fname, setLast] = useState("");
    const [lname, setLastN] = useState("");
    const [hospital, setName] = useState("");
    const [location, setloc] = useState("");
    const [hid, setID] = useState("");
    const [destination, setDest] = useState("");
    // const [username, setUser] = useState("");
   
    const onChangeHandler = (fieldName, value)=>{
        if(fieldName === "ems"){
        setFirst(value);
        set_employees(value);
       
        }
  }


    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
              const dbRef = ref(getDatabase());
              get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
                
                if (snapshot.exists()) {
                  console.log(snapshot.val())
                  name.push(snapshot.val())
                  setName(name[0].Hospital_name);
                  setloc(name[0].Hospital_location);
                  setID(user.uid);
    
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });

              get_request(id);
    
              get_employees(user.uid);

          

               
            }
        })
              
      },[]);
        
      function handleSubmit(e){
        e.preventDefault();


        const db = getDatabase();
        const dbRef = ref(db, `requests/${id}`);

        update(dbRef,{
          Personnel: fname,
          Personnel_uid: ems,
          Request_approved:Date().toLocaleString(),
          Status:"Ongoing",
          Vehicle_Registration:"GN 1932-19",
          Hospital_name:hospital,
          Hospital_location:location,
          Hospital_uid:hid,
          Vehicle:1,
        }).then(() => {
          console.log("Assigned");
          alert("EMS ASSIGNED")
          window.location.href="/admin/requests";
        }).catch((e) => {
          console.log(e);
        })
      }

      function get_employees(uid){
        const dbRef = ref(getDatabase());
              get(child(dbRef, `users/ems/`)).then((snapshot) => {
                
                if (snapshot.exists()) {
                  const emp=snapshot.val();
                  let fileToShow='<option>EMS Personnel</option> ';
                  for(var key in emp){
                    
                  
                    if(emp[key].Hospital_uid==uid){
                        setData(emp[key].uid,emp[key].First_name,emp[key].Last_name);
                      fileToShow += "<option value='" + emp[key].uid +"' >"+emp[key].First_name+" "+emp[key].Last_name+"</option>" ;
              
                      console.log(emp);
    
                    }
                  document.getElementById("emp").innerHTML=fileToShow;
                  
                  }
    
                 
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
    
      }

      function set_employees(uid){
        const dbRef = ref(getDatabase());
              get(child(dbRef, `users/ems/${uid}`)).then((snapshot) => {
                
                if (snapshot.exists()) {
                  const emp=snapshot.val();
                  setLast(snapshot.val().First_name + " "+ snapshot.val().Last_name)
                  
              
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
      function get_request(uid){
        const dbRef = ref(getDatabase());
              get(child(dbRef, `requests/${uid}`)).then((snapshot) => {
                
                if (snapshot.exists()) {
                  const req=snapshot.val();
                
                
                     
                      setDest(req.Destination);
                 
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
    
      }
    return(
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/requests">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
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

            <div>
                <MDBBtn href="/admin/requests"active>BACK</MDBBtn>
            </div>

              <div class="d-flex add align-items-start mb-3">
                <MDBCol>
                    <MDBCard style= {{ maxWidth: '40rem' }}>
                        <MDBCardBody>
                                <MDBCardTitle>Assign Request</MDBCardTitle>
                                <form onSubmit={(e)=>{handleSubmit(e)}}>
                                    <MDBInput className='mb-4'  id='form1' type='text' label="Request ID" value={id} readonly />
                                    <MDBInput className='mb-4' id='form2' type='text' label="Destination"  value={destination} readonly/>
                                    
                                    
                                    <Form.Select  label="EMS Personnel" id="emp" className='mb-4' aria-label="Default select example" onChange={(e)=>{ onChangeHandler("ems",e.target.value)}}>
                                  
                                    
                                        
                                    </Form.Select>
                                    <MDBInput className='mb-4' id='form4' type='text' label="EMS Name"  value={fname}  readonly/>
                                    <MDBBtn type='submit' className='mb-4'  block>
                                        ASSIGN
                                    </MDBBtn>

                                   
                                </form>

                        </MDBCardBody>
                    </MDBCard>
                  </MDBCol>   

                  
              </div>
        </div>

    );
}