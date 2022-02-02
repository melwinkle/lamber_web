import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { MDBCol } from 'mdb-react-ui-kit';
import Nav from "react-bootstrap/Nav";
import "../../App.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn,MDBTable, MDBTableHead, MDBTableBody, MDBBtnGroup } from 'mdb-react-ui-kit';
import {FaEye, FaPlus} from "react-icons/fa";



export default function AllEmployees() {
    
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
            <MDBBtn href="/admin/employees/add"active>Add New Employee <FaPlus/></MDBBtn>
            </div>
              <div class="d-flex live align-items-start mb-3">
                <MDBCol>
                    <MDBCard >
                        <MDBCardBody>
                            <MDBCardTitle>EMPLOYEES</MDBCardTitle>
                            <MDBCardText>
                                <MDBTable>
                                    <MDBTableHead>
                                      <tr>
                                        <th scope='col'>Employee #</th>
                                        <th scope='col'>First Name</th>
                                        <th scope='col'>Last Name</th>
                                        <th scope='col'>Phone Number</th>
                                        <th scope='col'>User Role</th>
                                        <th scope='col'>Request Count</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Actions</th>
                                    
                                      </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                      <tr>
                                        <th scope='row'>124</th>
                                        <td>Patricia</td>
                                        <td>Komla</td>
                                        <td>0240000000</td>
                                        <td>EMS Personnel</td>
                                        <td>10</td>
                                        <td>Active</td>
                                        <td><MDBBtn href="/admin/employees/single/"><FaEye/></MDBBtn></td>
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