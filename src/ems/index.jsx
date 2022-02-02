import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../src/App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {BiHealth} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";


export default function EMSDashboard() {
    
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
                     <a href="/" class="logout"> <FiLogOut/></a>
                   
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
                            <MDBCardTitle>CANCELLED REQUESTS</MDBCardTitle>
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
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Phone Number</th>
                                        <th scope='col'>Status</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>1 Berekuso Avenue</th>
                                        <td>0240000000</td>
                                        <td>Ongoing</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>1 Berekuso Avenue</th>
                                        <td>0240000000</td>
                                        <td>Completed</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>1 Berekuso Avenue</th>
                                        <td>0240000000</td>
                                        <td>Cancelled</td>
                                      </tr>
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                            <MDBBtn href="/ems/requests">View All</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   

                  <MDBCol>
                    <MDBCard style={{ maxWidth: '35rem' }}>
                        <MDBCardBody>
                            <MDBCardTitle>DAILY COUNT</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Number</th>
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>12th January 2022</th>
                                        <td>5</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>12th January 2022</th>
                                        <td>5</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>12th January 2022</th>
                                        <td>5</td>
                                      </tr>
                                    </MDBTableBody>
                              </MDBTable>
                            </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                  </MDBCol>   
              </div>
        </div>
  );
}