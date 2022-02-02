import React,{useState,useEffect} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../src/App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {BiHealth} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import { getDatabase, ref, onValue,child, get } from "firebase/database";
import { getAuth,signOut  } from "firebase/auth";

export default function Dashboard() {
  
  const[datas,setData] = useState({});
  const name=[];
  const db = getDatabase();
  const auth = getAuth();
const user = auth.currentUser;

// useEffect(() => {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//         getUserData(user.uid)
       
//     }
// })

// getUserData();


// }, [setData])
  
useEffect(()=>{
  auth.onAuthStateChanged(user => {
        if (user) {
          const dbRef = ref(getDatabase());
          get(child(dbRef, `hospital/${user.uid}`)).then((snapshot) => {
            
            if (snapshot.exists()) {
              console.log(snapshot.val())
              name.push(snapshot.val())
              setData({datas:name})
console.log(name)
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


  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber Admin</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/admin">
                    <Nav.Link href="/admin">Home</Nav.Link>
                    <Nav.Link href="/admin/requests">Requests</Nav.Link>
                    <Nav.Link href="/admin/employees">Employees</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                 
                   {/* {name.map((id,index)=>{
                     return(
                      <a href="/admin/profile">{id.Status}</a>  
                      )
 
                   }
                     
                     
                   
                    )} */}

{name.map((note,index) => {
  return (
    <div key={note.uid}>
      {note.Hospital_name}
    </div>
  );
})}
                  
                     <a  class="logout" onClick={()=>logout()}> <FiLogOut/></a>
                   
                  </Navbar.Text>
                  
                </Navbar.Collapse>
              </Container>
            </Navbar>

          

            <div class="d-flex sum align-items-start mb-3" >
                <MDBCol>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                              <span>100<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                              <span>100<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>INCOMING REQUESTS</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
                  <MDBCol>
                  <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardBody>
                            <MDBCardText>
                              <span>100<BiHealth/></span>
                            </MDBCardText>
                            <MDBCardTitle>TOTAL EMPLOYEES</MDBCardTitle>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </div>

              <div class="d-flex live align-items-start mb-3">
                <MDBCol>
                    <MDBCard style={{ maxWidth: '35rem' }}>
                        <MDBCardBody>
                            <MDBCardTitle>LIVE REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Personnel</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>Patricia Komla</th>
                                        <td>1 Berekuso University Avenue</td>
                                        <td>Ongoing</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>John Son</th>
                                        <td>Oyarifa Mall</td>
                                        <td>Completed</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>Rita Ross</th>
                                        <td>Peduase Valley Resort</td>
                                        <td>Cancelled</td>
                                      </tr>
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn href="/admin/requests">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   

                  <MDBCol>
                    <MDBCard style={{ maxWidth: '35rem' }}>
                        <MDBCardBody>
                            <MDBCardTitle>EMPLOYEE COUNT</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Personnel</th>
                                        <th scope='col'>Role</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>Patricia Komla</th>
                                        <td>EMS Personnel</td>
                                        <td>Active</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>John Son</th>
                                        <td>Driver</td>
                                        <td>Active</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>Rita Ross</th>
                                        <td>EMS Personnel</td>
                                        <td>Active</td>
                                      </tr>
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn  href="/admin/employees">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}