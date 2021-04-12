import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "axios";
import Header from "./Header";
import "./css/PatientList.css";

function PatientList() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [patientList, setPatientList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const addCountRequest = (apiAddress) => {
    console.log(localStorage.getItem("email"));
    Axios.post("http://localhost:8001/addCountRequest", {
      apiAddress: apiAddress,
      userEmail: localStorage.getItem("email"),
    }).then((response) => {
      console.log(response);
    });
  };

  const getPatient = () => {
    addCountRequest("patientList");
    Axios.get("http://localhost:8001/patientList").then((response) => {
      setPatientList(response.data);
    });
  };

  const addPatient = () => {
    if (
      name === "" ||
      city === "" ||
      mobile === "" ||
      gender === "" ||
      date === "" ||
      time === ""
    ) {
      alert("Please fill in!");
    } else {
      addCountRequest("createPatient");
      Axios.post("http://localhost:8001/createPatient", {
        name: name,
        city: city,
        mobile: mobile,
        gender: gender,
        date: date,
        time: time,
      }).then(() => {
        setPatientList([
          ...patientList,
          {
            name: name,
            city: city,
            mobile: mobile,
            gender: gender,
            date: date,
            time: time,
          },
        ]);
      });
      window.location.reload(false);
    }
  };

  const editPatientName = (ID) => {
    if (
      newName === "" ||
      newCity === "" ||
      newMobile === "" ||
      newGender === "" ||
      newDate === "" ||
      newTime === ""
    ) {
      alert("Please fill in!");
    } else {
      addCountRequest("updatePatient");
      Axios.put("http://localhost:8001/updatePatient/", {
        name: newName,
        city: newCity,
        mobile: newMobile,
        gender: newGender,
        date: newDate,
        time: newTime,
        ID: ID,
      }).then((response) => {
        setPatientList(
          patientList.map((val) => {
            console.log(val);
            return val.ID === ID
              ? {
                  ID: val.ID,
                  name: newName,
                  city: newCity,
                  mobile: newMobile,
                  gender: newGender,
                  date: newDate,
                  time: newTime,
                }
              : val;
          })
        );
      });
    }
  };

  const removePatient = (ID) => {
    console.log(ID);
    addCountRequest("deletePatient");
    Axios.delete(`http://localhost:8001/deletePatient/${ID}`).then(
      (response) => {
        setPatientList(
          patientList.filter((val) => {
            return val.ID !== ID;
          })
        );
      }
    );
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <>
          <Header />
          <div className="patientlist">
            <h3>Patient List</h3>
            <h5>Please add the patient</h5>
            <div className="inputForm">
              <label>Name</label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>City</label>
              <Form.Control
                required
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <label>Mobile</label>
              <Form.Control
                required
                type="text"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
              <label>Gender</label>
              <Form.Control
                required
                type="text"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label>Date</label>
              <Form.Control
                required
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <Form.Control
                required
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              <button id="addBtn" onClick={addPatient}>
                Add Client
              </button>
            </div>
            <br />
            <div className="allPatient">
              <button onClick={getPatient}>Show all patient</button>
              {patientList.map((val, key) => {
                return (
                  <div className="patient" key={key}>
                    <div id="patientInfo">
                      <p>Name: {val.name}</p>
                      <p>City: {val.city}</p>
                      <p>Mobile: {val.mobile}</p>
                      <p>Gender: {val.gender}</p>
                      <p>
                        Reservation date: {val.date} {val.time}
                      </p>
                    </div>
                    <div className="patientInfoInput">
                      <label id="label">Name:</label>
                      <input
                        required
                        type="text"
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}
                      />
                      <br />
                      <label id="label">City:</label>
                      <input
                        required
                        type="text"
                        onChange={(e) => {
                          setNewCity(e.target.value);
                        }}
                      />
                      <br />
                      <label id="label">Mobile:</label>
                      <input
                        required
                        type="text"
                        onChange={(e) => {
                          setNewMobile(e.target.value);
                        }}
                      />
                      <br />
                      <label id="label">Gender:</label>
                      <input
                        required
                        type="text"
                        onChange={(e) => {
                          setNewGender(e.target.value);
                        }}
                      />
                      <br />
                      <label id="label">Reservation date:</label>
                      <input
                        required
                        type="date"
                        onChange={(e) => {
                          setNewDate(e.target.value);
                        }}
                      />
                      <br />
                      <input
                        required
                        type="time"
                        onChange={(e) => {
                          setNewTime(e.target.value);
                        }}
                      />
                      <br />
                    </div>
                    <button
                      onClick={() => {
                        editPatientName(val.ID);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        removePatient(val.ID);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        (window.location.href = "/")
      )}
    </div>
  );
}

export default PatientList;
