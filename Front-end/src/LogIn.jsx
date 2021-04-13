import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./css/LogIn.css";
import Header from "./Header";

function LogIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();

  let endPoint = "https://heejaerica.online/4537/termproject/API/V1/";
  const logInRequest = (e) => {
    e.preventDefault();
    if (userEmail === "" || userPassword === "") {
      alert("There is empty input box. Please fill in.");
    } else {
      Axios.post(endPoint + "login", {
        email: userEmail,
        password: userPassword,
      }).then((response) => {
        // console.log(response);
        // console.log(response.message);

        if (response.data.token === undefined) {
          alert("This is invaild input");
        } else {
          localStorage.setItem("token", response.data.token);
          getUserEmail();

          history.push("/");
        }
      });
      // if (localStorage.getItem("email") === null) {
      //   alert("This is not valid input");
      // } else {
      //   // insertUserId();
      // }
    }
  };
  const insertUserId = (userEmail) => {
    // console.log(userEmail)
    Axios.post(endPoint + "insertUserId", {
      userEmail: userEmail,
    }).then((response) => {
      console.log(response);
    });
  };

  const getUserEmail = () => {
    // console.log(localStorage.getItem("token"));

    Axios.get(endPoint + "authUser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data);
      // setUserEmail(response.data);
      localStorage.setItem("email", response.data);
      insertUserId(response.data);
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="signin">
          <h1>Sign In</h1>
          <Form onSubmit={logInRequest}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                aria-required
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
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
                  setUserPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" id="signinBtn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
