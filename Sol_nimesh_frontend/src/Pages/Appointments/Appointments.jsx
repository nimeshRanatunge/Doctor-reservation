//Appointments.jsx
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Appointments.css";

export default function Appointments() {

  //new form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [isActive, setisActive] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7065/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7065/api/Employee";
    const data = {
      name: name,
      category: category,
      nicNumber : nicNumber,
      isActive: isActive,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Employee has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setCategory("");
    setNicNumber("");
    setisActive(0);
  };
  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setisActive(1);
    } else {
      setisActive(0);
    }
  };

  const handleAppointmentBook = (id) => {
    axios
      .get(`https://localhost:7065/api/Employee/${id}`)
      .then((result) => {
        navigate(`/appointment-details`, {
          state: { appointmentData: result.data },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <Fragment>
       <ToastContainer />
      <div className="AppoBody">
        <div className="AddDoctor">
        <Container>
          <h1>Add a Doctor</h1>
        </Container>
        <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter NIC"
              value={nicNumber}
              onChange={(e) => setNicNumber(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={isActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Add
            </button>
          </Col>
        </Row>
      </Container>
        </div>
        <Container>
          <h1>Doctors List</h1>
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        </Container>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Doctor Reg Number</th>
                <th>Doctor Name</th>
                <th>Category</th>
                <th>NIC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>SETHMA/DOC/{item.id}</td>
                    <td>Dr. {item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.nicNumber}</td>
                    <td colSpan={2}>
                      <button
                        className={
                          "btn btn-primary " +
                          (item.isActive === 0 ? "inactive" : "")
                        }
                        onClick={() => handleAppointmentBook(item.id)}
                        disabled={item.isActive === 0} // Disables the button if item.isActive is 0
                      >
                        Book Appointment
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
      </div>
    </Fragment>
  );
}
