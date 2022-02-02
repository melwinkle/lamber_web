import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";


export default function EMSProfile() {
    
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber EMS</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems">
                    <Nav.Link href="/ems">Home</Nav.Link>
                    <Nav.Link href="/ems/requests">Requests</Nav.Link>
                  </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                     <a href="/ems/profile">Patricia Komla</a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>


              <div class="d-flex profile align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>Patricia Komla
                                <h6>ACTIVE</h6>
                              
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <MDBCol><span class="singleh">Registration Date:<span class="singlet">12th December 2021</span></span></MDBCol>
                            <MDBCol><span class="singleh">Hospital:<span class="singlet">North Legon Hospital</span></span></MDBCol>
                            <MDBCol><span class="singleh">Email:<span class="singlet">pk@lamber.com</span></span></MDBCol>
                            <MDBCol><span class="singleh">Phone Number:<span class="singlet">+233240000000</span></span></MDBCol>
                            </MDBCardText>

                            <MDBBtn href='/ems/profile/general' active>Update</MDBBtn>
                                <MDBBtn href='/ems/profile/general' >Request Termination</MDBBtn>
                            
                            
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}