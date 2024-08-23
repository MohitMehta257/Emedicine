import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../Utility/constants";
import MainHeader from "./MainHeader";
import Footer from "./common/Footer";

const Registration = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imageAlt: "",
  });

  const [userImage, setUserImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("imageAlt", user.imageAlt);
    if (userImage) {
        formData.append("userImage", userImage);
    }

    try {
      console.log(user)
        const response = await axios.post(`${baseUrl}api/Users/registration`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (!response || !response.data) {
            throw new Error("Invalid response");
        }
        console.log("Registration successful:", response.data);
        toast.success("Registration successful!");
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            imageAlt: "",
        });
        setUserImage(null);
    } catch (error) {
        console.error("Registration error:", error);
        if (
            error.response.data &&
            error.response.data.errors &&
            error.response.data.errors.Password
        ) {
            alert(error.response.data.errors.Password);
        }
        toast.error(error.response.data);
    }
};

  return (
    <>
      <MainHeader />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Registration</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputChange}
                      required
                      min={3}
                    />
                  </div>                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      required
                      min={6}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userImage" className="form-label">
                      User Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="userImage"
                      name="userImage"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imageAlt" className="form-label">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="imageAlt"
                      name="imageAlt"
                      value={user.imageAlt}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    Register
                  </button>
                  <Link to="/" className="btn btn-secondary">
                    Login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Registration;
