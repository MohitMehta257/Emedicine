import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container d-flex justify-content-between">
      <a className="navbar-brand" href="#">
        EMedicine        
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About US
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact US
                </Link>
              </li>
        </ul>
      </div>
      <div className="d-flex align-items-center">        
        <button className="btn btn-outline-light" onClick={(e) => handleLogin(e)}>
          Login
        </button>
      </div>
    </div>
  </nav>
  )
}

export default MainHeader