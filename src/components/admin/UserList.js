import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../common/Header";
import { baseUrl } from "../../Utility/constants";
import moment from "moment";
import InnerFooter from "../common/InnerFooter";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Admin/userList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data && response.data.listUsers) {
        setUsers(response.data.listUsers);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>User List</h2>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Status</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.imageUrl}
                    alt={user.imageAlt}
                    title={user.imageAlt}
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                </td>
                <td>{user.status === 0 ? "Inactive" : "Active"}</td>
                <td>{moment(user.createdOn).format("MMMM DD, YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InnerFooter />
    </>
  );
};

export default UserList;
