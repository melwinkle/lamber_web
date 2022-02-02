import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";


export default function EMSProfileUpdate() {
    
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
                     <a href="/admin/profile">North Legon Hospital</a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>


              <div class="d-flex profile align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>NORTH LEGON HOSPITAL
                                <h6>ACTIVE</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <MDBCol><span class="singleh">Registration Date:<span class="singlet">Lisa Akpalu</span></span></MDBCol>
                            <MDBCol><span class="singleh">Location:<span class="singlet">+2332460545185</span></span></MDBCol>
                            <MDBCol><span class="singleh">Email:<span class="singlet">1 Berekuso University Avenue</span></span></MDBCol>
                            <MDBCol><span class="singleh">Phone Number:<span class="singlet">12:00 PM</span></span></MDBCol>
                            </MDBCardText>

                            <MDBBtn href='#' active>Update</MDBBtn>
                                
                            
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}