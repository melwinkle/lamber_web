import React, { useState } from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard, MDBCardBody, MDBCardTitle,
} from 'mdb-react-ui-kit';
import "../../App.css";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification} from "firebase/auth";

export default function Register() {
  const [name, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
    const [email, setName] = useState("");
  const [password, setEmail] = useState("");
  const [passwords, setPass] = useState("");
  const onChangeHandler = (fieldName, value)=>{
    if(fieldName === "email"){
      setName(value);
    }
    else if(fieldName==="name"){
      setCompany(value);
    }
    else if(fieldName==="location"){
      setLocation(value);
    }
    else if(fieldName==="phone"){
      setPhone(value);
    }
    else if(fieldName==="password"){
      setEmail(value);
    }
    else if(fieldName==="passwords"){
        setPass(value);
      }
  }
  const auth = getAuth();
  const db = getDatabase();
  
  const handleSubmit = (e)=>{
    e.preventDefault();
   
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
           .then(() => {
            alert("Verfication Email sent");
           })
           .catch((error) => {
               console.log('Email verification error', error);
           });
       
        set(ref(db, 'hospital/' + user.uid), {
          Hospital_name: name,
          Hospital_number: phone,
          Hospital_location: location,
          Status:"Active",
          userrole:1,
          Hospital_date:Date().toLocaleString(),
          uid: user.uid,
          Hospital_email: user.email,
          Vehicle:0,
        }).then(()=>{
          auth.onAuthStateChanged(user => {
                if (user) {
                 
                    window.location.href="/general";
                }
            })
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
    <div class="login">
        <MDBCard style={{ maxWidth: '40rem' }}>
                <MDBCardBody>
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4'  id='form1' type='text' label="Company Name" onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                            <MDBInput className='mb-4' id='form2' type='text' label="Company Location"  onChange={(e)=>{ onChangeHandler("location",e.target.value)}}/>
                            <MDBInput  className='mb-4' label='Phone number input' id='typePhone' type='tel' onChange={(e)=>{ onChangeHandler("phone",e.target.value)}} />
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            <MDBInput className='mb-4' type='password' id='form2Example4' label='Password' onChange={(e)=>{ onChangeHandler("password",e.target.value)}}/>
                            <MDBInput className='mb-4' type='password' id='form2Example2' label='Re-enter Password' onChange={(e)=>{ onChangeHandler("passwords",e.target.value)}}/>
                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                                </MDBCol>
                                <MDBCol>
                                <a href='#!'>Forgot password?</a>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type='submit' className='mb-4' block>
                                Register
                            </MDBBtn>

                            <div className='text-center'>
                                <p>
                                A member? <a href='/'>Sign In</a>
                                </p>
                            
                            </div>
                        </form>

                </MDBCardBody>
        </MDBCard>
    </div>
  );
}