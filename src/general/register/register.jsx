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
import * as logo from '../../images/lamber_logo.png';

export default function Register() {
  const [info, setInfo] = useState("");
  const [name, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
    const [email, setName] = useState("");
  const [password, setEmail] = useState("");
  const [passwords, setPass] = useState("");
  const [bank, setFirst] = useState("");
    const [number, setLast] = useState("");
    const [names, setMail] = useState("");
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
    else if(fieldName === "bank"){
        setFirst(value);
      }
    else if(fieldName==="number"){
        setLast(value);
      }
    else if(fieldName==="names"){
        setMail(value);
      }
  }
  const auth = getAuth();
  const db = getDatabase();
  
  const handleSubmit = (e)=>{
    e.preventDefault();
   
    try {

      if(name==""||phone==""||location==""||email==""||bank==""||number==""||names==""){
        setInfo("All fields are required");
      }
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
          Bank_name: bank,
          Bank_number: number,
          Account_name:names
        }).then(()=>{
          auth.onAuthStateChanged(user => {
                if (user) {
                 
                    window.location.href="/";
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
    <div class="login register">
        <MDBCard style={{ maxWidth: '50rem' }}>
        <div class="logo">
                  <img src={logo}></img>
                  </div>
                <MDBCardBody>
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <h4>{info}</h4>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4'  id='form1' type='text' label="Company Name" onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                            <MDBInput className='mb-4' id='form2' type='text' label="Company Location"  onChange={(e)=>{ onChangeHandler("location",e.target.value)}}/>
                            <MDBInput  className='mb-4' label='Phone number input' id='typePhone' type='tel' onChange={(e)=>{ onChangeHandler("phone",e.target.value)}} />
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            <MDBInput className='mb-4' type='password' id='form2Example4' label='Password' onChange={(e)=>{ onChangeHandler("password",e.target.value)}}/>
                            <MDBInput className='mb-4' type='password' id='form2Example2' label='Re-enter Password' onChange={(e)=>{ onChangeHandler("passwords",e.target.value)}}/>
                           
                            <MDBInput className='mb-4'  id='form3' type='text' label="Bank Name"  onChange={(e)=>{ onChangeHandler("bank",e.target.value)}} />
                            <MDBInput className='mb-4' id='form4' type='text' label="Bank Account Number"  onChange={(e)=>{ onChangeHandler("number",e.target.value)}}/>
                            <MDBInput  className='mb-4' label='Account Name' id='typePhone' type='text'  onChange={(e)=>{ onChangeHandler("names",e.target.value)}} />
                            <MDBBtn type='submit' className='sub mb-4' block>
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