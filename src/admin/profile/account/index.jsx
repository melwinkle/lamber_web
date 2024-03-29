import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import * as logo from '../../../images/lamber_logo.png';
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup,MDBInput,MDBSelect} from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";
import { getDatabase, ref, child, get,update } from "firebase/database";
import { getAuth,signOut } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";


export default function AddBank() {


  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [hospital, setName] = useState("");
const [hospid, setHosp] = useState("");


  
useEffect(()=>{


  
  auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(getDatabase());
          get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              console.log(snapshot.val())
              name.push(snapshot.val())
           
              setName(name[0].Hospital_name);
              setHosp(name[0].uid);
              setFirst(name[0].Bank_name);
              setLast(name[0].Bank_number);
              setMail(name[0].Account_name);

  
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

     
           
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

    const [bank, setFirst] = useState("");
    const [number, setLast] = useState("");

    const [names, setMail] = useState("");

    // const [username, setUser] = useState("");

    
    const onChangeHandler = (fieldName, value)=>{
        if(fieldName === "bank"){
        setFirst(value);
        }
        else if(fieldName==="number"){
        setLast(value);
        }
        else if(fieldName==="name"){
        setMail(value);
        }
       
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
  
    const db = getDatabase();
    const dbRef = ref(db, `hospital/${user.uid}`);
    update(dbRef,{
    Bank_name: bank,
    Bank_number: number,
    Account_name:names
  }).then(() => {
    console.log("Data updated");
    window.location="/admin/profile";
  }).catch((e) => {
    console.log(e);
  })
  
  }

    
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
               <Navbar.Brand href="#admin"><img src={logo} width="50" height="50" alt=""/>Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin">
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
                <MDBBtn href="/admin/profile"active>BACK</MDBBtn>
            </div>

              <div class="d-flex add align-items-start mb-3">
                <MDBCol>
                    <MDBCard style= {{ maxWidth: '40rem' }}>
                        <MDBCardBody>
                                <MDBCardTitle>Add Bank Account</MDBCardTitle>
                                <form onSubmit={(e)=>{handleSubmit(e)}}>
                                    <MDBInput className='mb-4'  id='form1' type='text' label="Bank Name" value={bank} onChange={(e)=>{ onChangeHandler("bank",e.target.value)}} />
                                    <MDBInput className='mb-4' id='form2' type='text' label="Bank Account Number" value={number}  onChange={(e)=>{ onChangeHandler("number",e.target.value)}}/>
                                    <MDBInput  className='mb-4' label='Account Name' id='typePhone' type='text' value={names}  onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                                   
                                    
                                   

                                    <MDBBtn type='submit' className='mb-4'  block>
                                        UPDATE
                                    </MDBBtn>

                                   
                                </form>

                        </MDBCardBody>
                    </MDBCard>
                  </MDBCol>   

                  
              </div>
        </div>
  );
}