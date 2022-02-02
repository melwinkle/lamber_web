import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../../src/App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup } from 'mdb-react-ui-kit';
import {FaEye} from "react-icons/fa";



export default function EMSIncomingRequests() {
    
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
                  <MDBBtn href='#' active>
                    Active
                  </MDBBtn>
                  <MDBBtn href='/ems/requests/general' outline color='primary'>Completed</MDBBtn>
                </MDBBtnGroup>
              </div>

              <div class="new">
                <MDBCol>
                  <MDBCard className="newcard">
                    <MDBCardBody>
                      <MDBCardTitle>
                        NEW REQUEST!
                      </MDBCardTitle>
                      <MDBCardText>
                        Incoming request #125 from Kitase Police Station
                      </MDBCardText>
                      
                        
                        <MDBBtn class="accept">ACCEPT</MDBBtn>
                        <MDBBtn class="decline">
                          DECLINE
                        </MDBBtn>
                      

                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </div>

              <div class="d-flex live align-items-start mb-3">
                <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>INCOMING REQUESTS</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Request #</th>
                                        <th scope='col'>DateTime</th>
                                        <th scope='col'>Vehicle Registration</th>
                                        <th scope='col'>Customer Name</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Request Type</th>
                                        <th scope='col'>Reason</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Actions</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>124</th>
                                        <td>19th September 2021 08:10:03 AM</td>
                                        <td>GN 1232-19</td>
                                        <td>Lisa Akpalu</td>
                                        <td>1 Berekuso University Avenue</td>
                                        <td>Specific Request</td>
                                        <td>Accident</td>
                                        <td>Ongoing</td>
                                        <td><MDBBtn href="/ems/requests/single/"><FaEye/></MDBBtn></td>
                                      </tr>
                                      
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn>View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   

                  
              </div>
        </div>
  );
}