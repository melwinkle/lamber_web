import React,{useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup,MDBInput,MDBSelect} from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";



export default function AddEmployee() {

    const [fname, setFirst] = useState("");
    const [lname, setLast] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setMail] = useState("");
    const [role, setRole] = useState("");
    const [username, setUser] = useState("");
    const [passwords, setPass] = useState("");
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
        else if(fieldName==="username"){
        setUser(value);
        }
        else if(fieldName==="role"){
            setRole(value);
            }
        else if(fieldName==="password"){
            setPass(value);
        }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(fname.trim()==="" ||lname.trim()==="" ||phone.trim()==="" ||email.trim()==="" || role.trim() ===""|| username.trim() ===""|| passwords.trim() ===""){
      alert("All Fields Required");
    }
    else{
      alert("Registration Succesful");
      setFirst("");
      setLast("");
      setPhone("");
      setUser("");
      setRole("");
      setMail("");
      setPass("");
      window.location.href="/admin/employees";
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
                     <a href="/admin/profile">North Legon Hospital</a>
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
                                        <option value="Administrator">Administrator</option>
                                    </Form.Select>
                                    <MDBInput className='mb-4' id='form4' type='text' label="Username"  onChange={(e)=>{ onChangeHandler("username",e.target.value)}}/>


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