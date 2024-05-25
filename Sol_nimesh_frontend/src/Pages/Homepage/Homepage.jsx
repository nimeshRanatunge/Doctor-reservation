//HomePage.jsx
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "./Homepage.css"

export default function Homepage() {

  const navigate = useNavigate();

  const handleCreateAppointmentClick = () => {
    navigate("/Appointments");
  };

    return (
      <Fragment>
        <div className="centered-container">
          <Button className="button" onClick={handleCreateAppointmentClick}>Create Appointment</Button>
        </div>
      </Fragment>
    );
  }