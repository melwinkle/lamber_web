import React, {useState , useEffect} from 'react';
import "../../App.css";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBCard, MDBCardBody, MDBCardTitle,
  } from 'mdb-react-ui-kit';

// import {onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth,sendPasswordResetEmail } from "firebase/auth";

// import{auth} from './index';
const AForgot=()=>{

    const db = getDatabase();

const [email, setName] = useState("");


const auth = getAuth();

// const [user,setUser]=useState({});
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
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <h3>Forgot Password</h3>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            

                            <MDBBtn type="submit" className='mb-4' block>
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