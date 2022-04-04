import React, {useState } from 'react';
import "../src/App.css";
import { getDatabase, ref,child, get } from "firebase/database";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle
  } from 'mdb-react-ui-kit';

import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import * as logo from '../src/images/lamber_logo.png';

const AHome=()=>{
  const [info, setInfo] = useState("");
const [email, setName] = useState("");
const [password, setEmail] = useState("");

const auth = getAuth();

const onChangeHandler = (fieldName, value)=>{
  if(fieldName === "email"){
    setName(value);
  }
  else if(fieldName==="password"){
    setEmail(value);
  }
}
const handleSubmit = (e)=>{
  e.preventDefault();

  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in  
    const user = userCredential.user;
    if(user.emailVerified){
     
      getUserData(user.uid)
    }else{
      alert("Not Verified");
    }
   
   

  })
  .catch((error) => {
    console.log( error.code);
    setInfo( error.code)

  });

 
  
}

function getUserData(uid) {
    const dbRef = ref(getDatabase());
get(child(dbRef, `hospital/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    window.location.href="/admin";

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error.code);
});

}

    return(
        <div class="login">

        <MDBCard style={{ maxWidth: '50rem' }}>
                <MDBCardBody>
                  <div class="logo">
                  <img src={logo}></img>
                  </div>
                 
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <h4>{info}</h4>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' onChange={(e)=>{ onChangeHandler("password",e.target.value)}}/>

                            <MDBRow className='mb-4'>
                              
                                <MDBCol id="password">
                                <a href='/general/password/'>Forgot password?</a>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type="submit" className='sub mb-4' block>
                                Sign in
                            </MDBBtn>

                            <div className='text-center'>
                                <p>
                                Not a member? <a href='/general/register'>Register</a>
                                </p>
                            
                            </div>
                        </form>

                </MDBCardBody>
        </MDBCard>
    </div>
    )
}

export default AHome;