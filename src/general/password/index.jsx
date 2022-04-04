import React, {useState} from 'react';
import "../../App.css";
import {
    MDBInput,
    MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle,
  } from 'mdb-react-ui-kit';

import { getAuth,sendPasswordResetEmail } from "firebase/auth";
import * as logo from '../../images/lamber_logo.png';

const AForgot=()=>{

const [email, setName] = useState("");
const auth = getAuth();
const onChangeHandler = (fieldName, value)=>{
  if(fieldName === "email"){
    setName(value);
  }
 
}

const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
const handleSubmit = (e)=>{
  e.preventDefault();

  sendPasswordReset(email);

}

    return(
        <div class="login">
        
        <MDBCard style={{ maxWidth: '40rem' }}>
                <MDBCardBody>
                <div class="logo">
                  <img src={logo}></img>
                  </div>
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <h4>Forgot Password</h4>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            

                            <MDBBtn type="submit" className='sub mb-4' block>
                                Reset Password
                            </MDBBtn>

                            <div className='text-center'>
                                <p>
                                Back to <a href='/'>Home</a>
                                </p>
                            
                            </div>
                        </form>

                </MDBCardBody>
        </MDBCard>
    </div>
    )
}

export default AForgot;