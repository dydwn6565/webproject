import React from "react";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MedicalStaff from "./MedicalStaff";
import Register from "./Register";
import LogIn from "./LogIn";
import Home from "./Home";
import PatientList from "./PatientList";
import Admin from "./Admin";
function App() {
  Axios.defaults.withCredentials = true;

  // const userAuthenticated = () => {
  //   Axios.get("http://localhost:8001/authUser", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <>
      <Router>
        <Route path="/MedicalStaff" component={MedicalStaff} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/LogIn" component={LogIn} exact />
        <Route path="/" component={Home} exact />
        <Route path="/PatientList" component={PatientList} exact />
        <Route path="/Admin" component={Admin} exact />
      </Router>
      <div className="App"></div>
    </>
  );
}

export default App;
