import React, { useState } from "react";
import { Link } from "react-router-dom";
import Medilogo from "../images/Medi-Logo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar style={{ backgroundColor: "#D3D3D3" }} light expand="md">
      <img src={Medilogo} alt="Medilogo" style={{ width: 100 }} />
      <NavbarBrand className="navbar-brand" href="/#/hospital/allPatients/">
        DMRD
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar style={{ fontSize: "18px" }}>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Patient
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/addPatient/">
                  Add patient
                </Link>
              </DropdownItem>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/allPatients/">
                  All Patients
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Appointments
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/bookAppointment/">
                  Book Appointment
                </Link>
              </DropdownItem>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/allAppointments/">
                  All Appointments
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              User
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/viewProfile/">
                  View Profile
                </Link>
              </DropdownItem>
              <DropdownItem style={{ backgroundColor: "White" }}>
                <Link style={{ textDecoration: "none" }} to="/editProfile/">
                  Edit Profile
                </Link>
              </DropdownItem>
              <DropdownItem
                onClick={() => localStorage.removeItem("token")}
                style={{ backgroundColor: "White" }}
              >
                <Link style={{ textDecoration: "none" }} to="/sign-in/">
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
