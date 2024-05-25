import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./AppointmentDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentDetails = () => {
  const location = useLocation();
  const { appointmentData } = location.state || {};

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //new form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [reservationTime, setReservationTime] = useState("");

  //edit form
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editEmpId, setEmpId] = useState(0);
  const [editNic, setEditNic] = useState("");
  const [editAppTime, setEditAppTime] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData(appointmentData.id);
  }, []);

  const getData = (empId) => {
    axios
      .get("https://localhost:7065/api/EmployeeResRecord", {
        params: {
          empId: empId,
        },
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    // alert(id);
    axios
      .get(`https://localhost:7065/api/EmployeeResRecord/${id}`)
      .then((result) => {
        setEditId(result.data.id);
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditNic(result.data.nicNumber);
        setEditAppTime(result.data.reservationTime);
        setEmpId(result.data.empId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      // alert(id);
      axios
        .delete(`https://localhost:7065/api/EmployeeResRecord/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Employee deleted");
            getData(appointmentData.id);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const handleUpdate = () => {
    const url = `https://localhost:7065/api/EmployeeResRecord/${editId}`;
    const data = {
      id: editId,
      name: editName,
      age: editAge,
      nicNumber: editNic,
      reservationTime: editAppTime,
      empId: editEmpId,
    };
    axios
      .put(url, data)
      .then((result) => {
        toast.success("Employee has been updated.");
        handleClose();
        getData(appointmentData.id);
        clear();
        
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7065/api/EmployeeResRecord";
    const data = {
      empId: appointmentData.id,
      name: name,
      age: age,
      nicNumber: nicNumber,
      reservationTime: reservationTime.toString(),
    };
    axios
      .post(url, data)
      .then((result) => {
        toast.success("Employee has been added");
        getData(appointmentData.id);
        clear();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setAge("");
    setNicNumber("");
    setEditName("");
    setEditNic("");
    setEditAge("");
    setEditAppTime("");
    setEditId("");
    setReservationTime("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container>
        <h1>Doctor Details</h1>
      </Container>
      <Container>
        <h2>
          Dr. {appointmentData.name} ({appointmentData.category})
        </h2>
        <h4>
          Status :{" "}
          {appointmentData.isActive === 0 ? "Not Available" : "Available"}
        </h4>
      </Container>

      <div className="AppointmentTab">
        <Container>
          <h3>Add a new appointment</h3>
        </Container>
        <Container>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="NIC"
                value={nicNumber}
                onChange={(e) => setNicNumber(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Reservation Time"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
              />
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <h1>Appointment List</h1>
      </Container>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>NIC</th>
              <th>Appointment Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.nicNumber}</td>
                  <td>{item.reservationTime}</td>
                  <td colSpan={2}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="NIC"
                value={editNic}
                onChange={(e) => setEditNic(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="Reservation Time"
                value={editAppTime}
                onChange={(e) => setEditAppTime(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AppointmentDetails;
