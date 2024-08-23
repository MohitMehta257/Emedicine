import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css"; // Ensure you create this CSS file
import { baseUrl } from "../../Utility/constants";
import Header from "./Header";
import InnerFooter from "./InnerFooter";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/Users/viewUser?ID=${localStorage.getItem("userID")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
              "Content-Type": "application/json",
            },
          });
        if (response.data.statusCode === 200) {
          setUser(response.data.user);
        } else {
          console.error(
            "Error fetching user data:",
            response.data.statusMessage
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={user.imageUrl}
              alt={user.imageAlt}
              className="img-thumbnail profile-image"
            />
          </div>
          <div className="col-md-8"> 
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>
      </div>
      <InnerFooter />
    </>
  );
};

export default Profile;
