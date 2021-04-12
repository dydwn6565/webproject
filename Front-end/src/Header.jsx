import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./css/Home.css";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const authChecker = () => {
      if (localStorage.getItem("token")) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    authChecker();
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/">
        <Button variant="dark">White Tower</Button>
      </Link>
      <Nav className="mr-auto">
        {authenticated ? (
          <div>
            <LinkContainer to="/PatientList">
              <Button variant="dark">Patient List</Button>
            </LinkContainer>

            <LinkContainer to="/MedicalStaff">
              <Button variant="dark">Medical Staff</Button>
            </LinkContainer>

            <LinkContainer to="/Admin">
              <Button variant="dark">Admin</Button>
            </LinkContainer>
            <Button variant="dark" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <LinkContainer to="/Login">
              <Button variant="dark">Login</Button>
            </LinkContainer>

            <LinkContainer to="/Register">
              <Button variant="dark">Register</Button>
            </LinkContainer>
          </div>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
