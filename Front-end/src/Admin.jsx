import React, { useEffect, useState } from "react";
import Header from "./Header";
import Axios from "axios";
function Admin() {
  // const [serverRequestList, setServerRequestList] = useState({});
  const [postMedicalStaff, setPostMedicalStaff] = useState("");
  // const [serverRequestList, setServerRequestList] = useState("");
  const [getMedicalStaff, setGetMedicalStaff] = useState("");
  const [putMedicalStaff, setPutMedicalStaff] = useState("");
  const [deleteMedicalStaff, setDeleteMedicalStaff] = useState("");
  const [createPatient, setCreatePatient] = useState("");
  const [patientList, setPatientList] = useState("");
  const [updatePatient, setUpdatePatient] = useState("");
  const [deletePatient, setDeletePatient] = useState("");
  const [updateReserved, setUpdateReserved] = useState("");
  const [updateNotReserved, setUpdateNotReserved] = useState("");

  useEffect(() => {
    const getTotalServerRequest = () => {
      Axios.get(
        "http://localhost:8001/totalServerRequest/" +
          localStorage.getItem("email"),
        {}
      ).then((response) => {
        setPostMedicalStaff(response.data.postMedicalStaff);
        setGetMedicalStaff(response.data.getMedicalStaff);
        setPutMedicalStaff(response.data.putMedicalStaff);
        setDeleteMedicalStaff(response.data.deleteMedicalStaff);
        setCreatePatient(response.data.createPatient);
        setPatientList(response.data.patientList);
        setUpdatePatient(response.data.updatePatient);
        setDeletePatient(response.data.deletePatient);
        setUpdateReserved(response.data.updateReserved);
        setPostMedicalStaff(response.data.updateNotReserved);
        setUpdateNotReserved(response.data.postMedicalStaff);
      });
    };
    getTotalServerRequest();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center w-50">
          <table className="table ">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }} scope="col">
                  Method
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Endpoint
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Requests
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              <>
                <tr style={{ textAlign: "center" }}>
                  <td>POST</td>
                  <td>/4537/termproject/API/V1/post/medicalStaff</td>
                  <td>{postMedicalStaff}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>GET</td>
                  <td>/4537/termproject/API/V1/get/medicalStaff</td>
                  <td>{getMedicalStaff}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>PUT</td>
                  <td>/4537/termproject/API/V1/put/medicalStaff</td>
                  <td>{putMedicalStaff}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>DELETE</td>
                  <td>/4537/termproject/API/V1/delete/medicalStaff</td>
                  <td>{deleteMedicalStaff}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>POST</td>
                  <td>/4537/termproject/API/V1/createPatient</td>
                  <td>{createPatient}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>GET</td>
                  <td>/4537/termproject/API/V1/patientList</td>
                  <td>{patientList}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>PUT</td>
                  <td>/4537/termproject/API/V1/updatePatient</td>
                  <td>{updatePatient}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>DELETE</td>
                  <td>/4537/termproject/API/V1/deletePatient/:ID</td>
                  <td>{deletePatient}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>PUT</td>
                  <td>/4537/termproject/API/V1/updateReserved</td>
                  <td>{updateReserved}</td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td>PUT</td>
                  <td>/4537/termproject/API/V1/updateNotReserved</td>
                  <td>{updateNotReserved}</td>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
