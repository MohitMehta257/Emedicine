import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../common/Header";
import { baseUrl } from "../../Utility/constants";
import "../common/Products.css";
import InnerFooter from "../common/InnerFooter";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const role = localStorage.getItem("Role") !== "Users" ? "Admin" : "User";
  const email = localStorage.getItem("userEmail");

  const fetchOrders = async () => {
    setLoading(true);
    let url = `${baseUrl}api/Medicines/orderList?Type=${role}`;
    if (role === "User" && email) {
      url += `&Email=${encodeURIComponent(email)}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data && response.data.listOrders) {
        setOrders(response.data.listOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleShowOrderDetails = async (orderNo) => {
    try {
      const response = await axios.get(
        `${baseUrl}api/Medicines/orderList?Type=UserItems&ID=${orderNo}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
            'Content-Type': 'application/json'
          }
        });
      if (response.data && response.data.listOrders) {
        setSelectedOrderDetails(response.data.listOrders);
        setShowOrderDetailsModal(true);
      }
      console.log(baseUrl+'api/Medicines/orderList?Type=UserItems&ID='+orderNo);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Error fetching order details");
    }
  };

  const handleCloseOrderDetailsModal = () => {
    setShowOrderDetailsModal(false);
    setSelectedOrderDetails([]);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>Order List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Order Total</th>
                <th>Order Status</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleShowOrderDetails(order.id)}
                    >
                      {order.orderNo}
                    </Button>
                  </td>
                  <td>{order.orderTotal}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
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


      {/* Modal for showing order details */}
      <Modal
        show={showOrderDetailsModal}
        onHide={handleCloseOrderDetailsModal}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrderDetails.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Manufacturer</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.medicineName}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.medicineName}
                        title={item.medicineName}
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                    </td>
                    <td>{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No details available for this order.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyOrders;
