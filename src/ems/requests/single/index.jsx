import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBBtnGroup} from 'mdb-react-ui-kit';
import {FaDownload} from "react-icons/fa";


export default function SingleRequest() {
    
  return (
        <div class='dashboard'>
            <Navbar fixed="top" >
              <Container>
                <Navbar.Brand href="#admin">Lamber EMS</Navbar.Brand>
                <Nav className="me-auto" variant="tabs" defaultActiveKey="/ems/requests">
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

            <div>
              <MDBBtnGroup aria-label='Basic example'>
                  <MDBBtn href='/ems/requests' active>
                    Back
                  </MDBBtn>
                </MDBBtnGroup>
              </div>

              <div class="d-flex single align-items-start mb-3">
              <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                          <MDBCol>
                          <MDBCardText className="snap">
                              <img
                                src='https://mdbootstrap.com/img/new/standard/city/041.webp'
                                className='img-thumbnail'
                                alt='...'
                                style={{ maxWidth: '26rem' }}
                              />
                            </MDBCardText>

                          </MDBCol>
                          <MDBCol>
                          <MDBCardTitle>REQUEST #1224
                                <h6>19th September 2021 08:08:00 AM</h6>
                                <h6>PERSONNEl: PATRICIA KOMLA</h6>
                                <h6>VEHICLE RN: GN 1983-19</h6>
                            </MDBCardTitle>
                            <MDBCardText>
                                
                            <MDBCol><span class="singleh">Customer Name:<span class="singlet">Lisa Akpalu</span></span></MDBCol>
                            <MDBCol><span class="singleh">Customer Number:<span class="singlet">+2332460545185</span></span></MDBCol>
                            <MDBCol><span class="singleh">Destination:<span class="singlet">1 Berekuso University Avenue</span></span></MDBCol>
                            <MDBCol><span class="singleh">Pick-Up Time:<span class="singlet">12:00 PM</span></span></MDBCol>
                            <MDBCol><span class="singleh">Estimated Time of Arrival:<span class="singlet">20 minutes</span></span></MDBCol>
                            <MDBCol><span class="singleh">Reason:<span class="singlet">Accident</span></span></MDBCol>
                            <MDBCol><span class="singleh">Request Time:<span class="singlet">11:00:00 AM</span></span></MDBCol>
                            <MDBCol><span class="singleh">Request Approved:<span class="singlet">11:05:00 AM</span></span></MDBCol>
                            <MDBCol><span class="singleh">Rating:<span class="singlet">N/A</span></span></MDBCol>
                            </MDBCardText>

                          </MDBCol>
                            
                            <MDBBtn>Download<FaDownload/></MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}