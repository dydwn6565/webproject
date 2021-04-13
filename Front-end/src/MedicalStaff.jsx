import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Button, Overlay, Tooltip } from "react-bootstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./App.css";

function MedicalStaff() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [updateNum, setUpdateNum] = useState("");
  const [list, setList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setselectedPatient] = useState("");
  const [patientID, setPatientId] = useState("");
  const [patientState, setPatientState] = useState("");
  // const [userEmail, setUserEmail] = useState("");

  const [show, setShow] = useState(false);
  const target = useRef(null);

  let endPoint = "https://heejaerica.online/4537/termproject/API/V1/";
  useEffect(() => {
    const getPatient = () => {
      Axios.get(endPoint + "patientList/").then((response) => {
        setPatientList(response.data);
        console.log(response.data);
      });
    };
    getPatient();
    GetMedicalStaff();
    // getUserEmail();
    // insertUserId();
  }, []);
  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const addCountRequest = (apiAddress) => {
    console.log(localStorage.getItem("email"));
    Axios.post(endPoint + "addCountRequest/", {
      apiAddress: apiAddress,
      userEmail: localStorage.getItem("email"),
    }).then((response) => {
      console.log(response);
    });
  };

  // const insertUserId = () => {
  //   // console.log(userEmail)
  //   Axios.post("http://localhost:8001/insertUserId", {
  //     userEmail: localStorage.getItem("email"),
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const RegisterRequest = () => {
    console.log(startTime.split(" ")[1]);
    console.log(endDate + " " + endTime);

    if (
      name === "" ||
      position === "" ||
      startTime === "" ||
      endDate === "" ||
      endTime === "" ||
      selectedPatient === ""
    ) {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      addCountRequest("updateReserved");
      Axios.put(endPoint + "updateReserved/", {
        patientID: patientID,
        name: name,
        position: position,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
      }).then((response) => {
        // console.log(response);
        // console.log("line55");
        addCountRequest("postMedicalStaff");
        Axios.post(endPoint + "post/medicalStaff/", {
          name: name,
          position: position,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          patientID: patientID,
        }).then((response) => {
          console.log(response);
        });
        reloadPage();
      });
    }
  };

  const UpdateMedicalStaff = (Id, startDate, patientID) => {
    // console.log(startDate);
    if (name === "" || position === "" || endDate === "" || endTime === "") {
      alert("please type empty section");
    } else if (startTime > endDate + " " + endTime) {
      alert("Your end time is forward than your start time");
    } else if (patientState === 1) {
      alert("This patient already has been scheduled  ");
    } else {
      addCountRequest("putMedicalStaff");
      Axios.put(endPoint + "put/medicalStaff/", {
        name: name,
        position: position,
        startTime: startDate,
        endDate: endDate,
        endTime: endTime,
        updateNum: Id,
        patientID: patientID,
      }).then((response) => {
        console.log(response);
        // window.location.reload(false);
      });
      reloadPage();
    }
  };

  const GetMedicalStaff = () => {
    Axios.get(endPoint + "get/medicalStaff/", {
      // name: name,
      // position: position,
      // startTime: startTime,
      // endDate: endDate,
      // endTime: endTime,
      // patientID: patientID,
    }).then((response) => {
      addCountRequest("getMedicalStaff");
      // console.log(response.data);
      // console.log(response.data[0].start_at);
      setList(response.data);
    });
  };

  const DeleteMedicalStaff = (patientID, updateNum) => {
    // console.log("line107");
    addCountRequest("updateNotReserved");
    Axios.put(endPoint + "updateNotReserved/", {
      patientID: patientID,
    }).then((response) => {
      // console.log(response);
      // console.log("line 108 delete");
      addCountRequest("deleteMedicalStaff");
      Axios.delete(endPoint + "delete/medicalStaff/", {
        data: {
          updateNum: updateNum,
        },
      }).then((response) => {
        console.log(response);
      });
      reloadPage();
    });
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <>
          <Header />
          <div className="d-flex justify-content-center p-3">
            <h3>Create Schedule</h3>
          </div>
          <div className="row">
            <div className="column"></div>
            <div className="column ">
              <div className="d-flex justify-content-center">
                <div className="createScehdule">
                  <form className="d-flex justify-content-center ">
                    <div className="form-row w-100 mx-3">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputName4">Staff Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName4"
                          placeholder="name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPosition4">Position</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPosition4"
                          placeholder="position"
                          onChange={(e) => {
                            setPosition(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        {/* <label htmlFor="inputPosition4">Select Patient</label> */}
                        <Dropdown>
                          <span>Select patient: </span>

                          <Dropdown.Toggle variant="success btn-sm" id="dropdown-basic">
                            Patient Id
                          </Dropdown.Toggle>
                          <br />

                          <Dropdown.Menu variant="secondary btn-sm" id="dropdown-basic">
                            {patientList &&
                              patientList.map((patient, index) => (
                                <Dropdown.Item
                                  key={index}
                                  onClick={(e) => {
                                    setselectedPatient(patient.date);
                                    setStartTime(patient.date);
                                    setPatientId(patient.ID);
                                    setPatientState(patient.reservedState);
                                  }}
                                >
                                  {console.log(patient)}
                                  Patient Name: {patient.name}
                                  <span>
                                    {patient.reservedState === 1 ? (
                                      <p>Reserved</p>
                                    ) : (
                                      <p>Not Reserved</p>
                                    )}
                                  </span>
                                </Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="inputName4">Start Date:</label>
                        <div>{selectedPatient}</div>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputName4">End Date: </label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                        />
                        <input
                          type="time"
                          className="form-control"
                          onChange={(e) => {
                            setEndTime(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </form>

                  <br />
                  <br />
                  <div className="d-flex justify-content-center">
                    <Button className="btn btn-success btn-sm mr-3" onClick={GetMedicalStaff}>
                      View Schedule
                    </Button>
                    <Button className="btn btn-primary btn-sm mr-3" onClick={RegisterRequest}>
                      Add Schedule
                    </Button>
                    <Button
                      className="btn btn-info btn-sm mr-3"
                      ref={target}
                      onClick={() => setShow(!show)}
                    >
                      How To Use
                    </Button>
                    <Overlay target={target.current} show={show} placement="top">
                      {(props) => (
                        <Tooltip {...props}>
                          <div style={{ lineHeight: "1" }}>
                            <h5>Guide line</h5>
                            <p>
                              <b>Create Schedule:</b>
                            </p>
                            <p>1. Please fill up empty section and select one of patient</p>
                            <p>2. Press Add Schedule button(blue colour button) </p>
                            <p>
                              <b>Update Schedule:</b>{" "}
                            </p>
                            <p>1. Please fill up empty sections </p>
                            <p>2. Press Update button(grey colour button) </p>
                            <p>
                              <b>Delete Schedule:</b>{" "}
                            </p>
                            <p>Press Delete button(light blue colour button) </p>
                          </div>
                        </Tooltip>
                      )}
                    </Overlay>
                  </div>
                </div>
              </div>
            </div>

            <div className="column"></div>
          </div>

          <div className="d-flex justify-content-center">
            <div className="schedule">
              <div>{list.position}</div>
              <div className="d-flex justify-content-center">
                <h3>Schedule list</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Po
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      ST Date
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Ed Date
                    </th>
                    <th scope="col"># Patient</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((li, index) => (
                    <>
                      <tr key={index}>
                        <td>{li.Id}</td>
                        <td>{li.name}</td>
                        <td>{li.position}</td>
                        <td>{li.start_at}</td>
                        <td>{li.end_at}</td>
                        <td style={{ textAlign: "center" }}>{li.patientID}</td>
                        <Button
                          className="btn btn-secondary btn-sm mr-3 mt-2"
                          onClick={() => {
                            UpdateMedicalStaff(li.Id, li.start_at, li.patientID);
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          className="btn btn-info btn-sm mr-3 mt-2"
                          onClick={() => {
                            DeleteMedicalStaff(li.patientID, li.Id);
                          }}
                        >
                          Delete
                        </Button>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        (window.location.href = "/")
      )}
    </div>
  );
}

export default MedicalStaff;
