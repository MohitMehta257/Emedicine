import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../Utility/constants";
import MainHeader from "./MainHeader";
import Footer from "./common/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("Role");
    localStorage.removeItem("userID");
    localStorage.removeItem("AccessToken");
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}api/Users/Login`, {
        Email: email,
        password: password,
      });
      // Check if response or data is null or undefined
      if (!response || !response.data) {
        throw new Error("Invalid response");
      }
      if (response.data && response.data.user) {
        localStorage.setItem("Role", response.data.user.type);

        console.log("Login successful:", response.data);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userID", response.data.user.id);
        localStorage.setItem("AccessToken", response.data.token);
        if (response.data.user.type === "Users") {
          navigate("/dashboard");
        } else {
          navigate("/admindashboard");
        }
      } else {
        toast.error(response.data.statusMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <MainHeader />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <Link to="/registration" className="btn btn-secondary">
                    Registration
                  </Link>
                </form>
              </div>
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
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
};

export default Login;
