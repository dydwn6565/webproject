import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Header from "./Header";
import "./css/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const RegisterRequest = () => {
    if (email === "" || password === "") {
      alert("There is empty input box. Please fill in.");
    } else {
      Axios.post("http://localhost:8001/register", {
        email: email,
        password: password,
      }).then((response) => {
        console.log(response);
      });
      history.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="signup">
          <h1>Sign Up</h1>
          <Form onSubmit={RegisterRequest}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                aria-required
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                aria-required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" id="signupBtn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
