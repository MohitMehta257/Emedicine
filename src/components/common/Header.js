import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Utility/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [userImage, setUserImage] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Users/viewUser?ID=${localStorage.getItem("userID")}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.data) {
        setUserImage(response.data.user.imageUrl);
        setImageAlt(response.data.user.imageAlt);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("Role");
    localStorage.removeItem("userID");
    localStorage.removeItem("AccessToken");
    // Redirect to the login page or home page
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex justify-content-between">
          <a className="navbar-brand" href="#">
            EMedicine{" "}
            {/* {localStorage.getItem("Role") !== "Users" ? "Admin" : "User"} -
            Dashboard */}
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
                <Link className="nav-link" to="/aboutus">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              {localStorage.getItem("Role") !== "Users" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-list">
                      User List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/medicine-master">
                      Medicine Master
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/order-list">
                      Order List
                    </Link>
                  </li>
                </>
              ) : (
                <>
                <li className="nav-item">
                    <Link className="nav-link" to="/my-orders">
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>                  
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact US
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
          
            {userImage && (
              <Link className="nav-link" to="/profile">
              <img
                src={userImage}
                alt={imageAlt}
                title={imageAlt}
                className="rounded-circle"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              </Link>
            )}
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
