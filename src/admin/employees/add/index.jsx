import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup,MDBInput,MDBSelect} from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";
import { getDatabase, ref, onValue,child, get,set } from "firebase/database";
import { getAuth,signOut,createUserWithEmailAndPassword  } from "firebase/auth";
import {FiLogOut} from "react-icons/fi";


export default function AddEmployee() {


  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;
const [hospital, setName] = useState("");



  
useEffect(()=>{


  
  auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(getDatabase());
          get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              console.log(snapshot.val())
              name.push(snapshot.val())
           
              setName(name[0].Hospital_name);
  
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

      //     const starCountRef = ref(db, `hospital/${user.uid}`);
      //     onValue(starCountRef, (snapshot) => {
      //         const data = snapshot.val();
      //         if(data!==null){
      //             setData({...snapshot.val()})
      //             console.log(data);
  
      //         }else{
      //             setData({});
      //         }
          
  
      //         return () =>{
      //             setData({});
      //         };
  
      // })
           
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

    const [fname, setFirst] = useState("");
    const [lname, setLast] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setMail] = useState("");
    const [role, setRole] = useState("");
    // const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const onChangeHandler = (fieldName, value)=>{
        if(fieldName === "email"){
        setMail(value);
        }
        else if(fieldName==="fname"){
        setFirst(value);
        }
        else if(fieldName==="lname"){
        setLast(value);
        }
        else if(fieldName==="phone"){
        setPhone(value);
        }
        // else if(fieldName==="username"){
        // setUser(value);
        // }
        else if(fieldName==="role"){
            setRole(value);
            }
        else if(fieldName==="password"){
            setPass(value);
        }
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    
 
    try {
      
      
  
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        set(ref(db, 'users/ems/' + user.uid), {
          Email: user.email,
          First_name: fname,
          Last_name: lname,
          Number:phone,
          userrole:2,
          Online:0,
          uid: user.uid,
          Status: "Active",
          Hospital:hospital,
          Role:role
        }).then(()=>{
          alert("Employee Added successfully");
          window.location.href="/admin/employees"
        });
       
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;

        console.log(errorMessage)
        // ..
      });
    

  } catch (error) {
      console.log(error.message)
  }

  }

    
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin/employees">
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
                <MDBBtn href="/admin/employees"active>BACK</MDBBtn>
            </div>

              <div class="d-flex add align-items-start mb-3">
                <MDBCol>
                    <MDBCard style= {{ maxWidth: '40rem' }}>
                        <MDBCardBody>
                                <MDBCardTitle>Add New Employee</MDBCardTitle>
                                <form onSubmit={(e)=>{handleSubmit(e)}}>
                                    <MDBInput className='mb-4'  id='form1' type='text' label="First Name" onChange={(e)=>{ onChangeHandler("fname",e.target.value)}} />
                                    <MDBInput className='mb-4' id='form2' type='text' label="Last Name"  onChange={(e)=>{ onChangeHandler("lname",e.target.value)}}/>
                                    <MDBInput  className='mb-4' label='Phone number' id='typePhone' type='tel' onChange={(e)=>{ onChangeHandler("phone",e.target.value)}} />
                                    <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                                    
                                    <Form.Select className='mb-4' aria-label="Default select example" onChange={(e)=>{ onChangeHandler("role",e.target.value)}}>
                                        <option>User Role</option>
                                        <option value="EMS">EMS Personnel</option>
                                        <option value="Driver">Driver</option>
                                    </Form.Select>
                                    {/* <MDBInput className='mb-4' id='form4' type='text' label="Username"  onChange={(e)=>{ onChangeHandler("username",e.target.value)}}/> */}


                                    <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' onChange={(e)=>{ onChangeHandler("password",e.target.value)}}/>
                                 

                                    <MDBBtn type='submit' className='mb-4'  block>
                                        ADD
                                    </MDBBtn>

                                   
                                </form>

                        </MDBCardBody>
                    </MDBCard>
                  </MDBCol>   

                  
              </div>
        </div>
  );
}