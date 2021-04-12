import React from "react";
import { Jumbotron, Row, Container } from "react-bootstrap";
import Header from "./Header";
import "./css/Home.css";

function Home() {
  return (
    <>
      <Header />
      <Container>
        <Jumbotron className="mt-5">
          <h1>Appoinment management system</h1>
          <p>
            This website is for a manager who wants to manages appointment between doctors and
            patients in their database system. After signup or login if you already have an account,
            you can create, read, update, and delete any of the appointment.
          </p>

          <Row className="d-flex my-2 ml-1 align-middle">
            <span>Please start with register!</span>
          </Row>
        </Jumbotron>
      </Container>
    </>
  );
}

export default Home;
