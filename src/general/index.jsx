import React, {useState , useEffect} from 'react';
import "../../src/App.css";
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
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";

// import{auth} from './index';
const AHome=()=>{
    const[data,setData] = useState({});
    const db = getDatabase();
//     useEffect(()=>{

//         const starCountRef = ref(db, 'hospital');
//         onValue(starCountRef, (snapshot) => {
//             const data = snapshot.val();
//             if(data!==null){
//                 setData({...snapshot.val()})
//                 console.log(data);

//             }else{
//                 setData({});
//             }
        

//             return () =>{
//                 setData({});
//             };

//     })
// },[]);
const [email, setName] = useState("");
const [password, setEmail] = useState("");

const auth = getAuth();

// const [user,setUser]=useState({});
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
   
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

 
   


   

  

//   if(email.trim()==="" || password.trim() ===""){
//     alert("Both Fields Required");
//   }
//   else{
//     alert("Login Succesful");
//     if(email=="ems@gmail.com"){
//       setName("");
//       setEmail("");
//       window.location.href="ems";
//     }
//     else{
//       setName("");
//       setEmail("");
//       window.location.href="admin";
//     }
   
//   }
}

function getUserData(uid) {
    const dbRef = ref(getDatabase());
get(child(dbRef, `hospital/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    setData({...snapshot.val()})
    console.log(snapshot.val());
    window.location.href="admin";

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

}


// function relocate(){
//     Object.keys(data).map((id,index)=>(
        
//         console.log("log"+data[id].userrole  ) 
     
//  )
//  )
// }









  
const [itemsArray, setItemsArray] = useState([]);
    return(
        <div class="login">
        <div>
        
        </div>
        <MDBCard style={{ maxWidth: '40rem' }}>
                <MDBCardBody>
                        <MDBCardTitle>LAMBER MANAGEMENT</MDBCardTitle>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address'  onChange={(e)=>{ onChangeHandler("email",e.target.value)}}/>
                           


                            <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' onChange={(e)=>{ onChangeHandler("password",e.target.value)}}/>

                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                                </MDBCol>
                                <MDBCol>
                                <a href='#!'>Forgot password?</a>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type="submit" className='mb-4' block>
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