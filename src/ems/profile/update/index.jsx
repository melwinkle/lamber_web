import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup,MDBInput} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,update } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";

export default function EMSProfileUpdate() {
  const[data,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [full, setName] = useState("");
const [status, setStatus] = useState("");
const [hospital, setHospital] = useState("");
const [phone, setPhone] = useState("");
const [role, setRole] = useState("");
const [email, setEmail] = useState("");
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
                          setName(name[0].First_name+" "+name[0].Last_name);
                          setStatus(name[0].Status);
                          setHospital(name[0].Hospital);
                          setRole(name[0].Role);
                          setPhone(name[0].Number);
                          setEmail(name[0].Email);
                      }else{
                          setData({});
                      }
                  
          
                      return () =>{
                  
                          setData({});
                      };
          
              })
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

const onChangeHandler = (fieldName, value)=>{
 
  
  if(fieldName==="name"){
    setName(value);
  }
  else if(fieldName==="phone"){
    setPhone(value);
  }

}

const handleSubmit = (e)=>{
  e.preventDefault();
  const fn=full.split(" ");
  const fname=fn.at(0);
  const lname=fn.at(1);

  const db = getDatabase();
  const dbRef = ref(db, `users/ems/${user.uid}`);
  update(dbRef,{
  First_name:fname ,
  Last_name: lname,
  Number:phone
}).then(() => {
  console.log("Data updated");
}).catch((e) => {
  console.log(e);
})

}
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber EMS</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems/dashboard">
                    <Nav.Link href="/ems/dashboard">Home</Nav.Link>
                    <Nav.Link href="/ems/requests">Requests</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <a href="/admin/profile">{full}</a>
                     <a  class="logout" onClick={()=>logout()}> <FiLogOut/></a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>


              <div class="d-flex profile align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>{full}
                                <h6>ACTIVE</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4'  id='form1' type='text' label="Full Name" value={full }onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                            <MDBInput  className='mb-4' label='Phone number input' id='typePhone' type='tel' value={phone}onChange={(e)=>{ onChangeHandler("phone",e.target.value)}} />
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' value={email} readonly/>
                           


                            
                            

                            <MDBBtn type='submit' className='mb-4' block>
                                Update
                            </MDBBtn>

                          
                        </form>
                                
                        </MDBCardText>
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}