import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand"><b>Sethma Doctor Reservation System</b></div>
        <div className="navbar-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/Appointments">Appointments</Link>
        <Link className="nav-link" to="/ContactUS">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
