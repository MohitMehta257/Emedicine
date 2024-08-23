import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../common/Header";
import { baseUrl } from "../../Utility/constants";
import InnerFooter from './InnerFooter';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState('');
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
  const role = localStorage.getItem("Role") !== "Users" ? "Admin" : "User";
  const email = localStorage.getItem("Email");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

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

  const handleShowModal = (orderNo) => {
    setSelectedOrderNo(orderNo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderStatus('');
  };

  const handleStatusChange = (e) => {
    setSelectedOrderStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrderStatus) {
      toast.error("Please select a status");
      return;
    }

    const url = `${baseUrl}api/Admin/updateOrderStatus?OrderNo=${selectedOrderNo}&OrderStatus=${selectedOrderStatus}`;

    try {
      const response = await axios.put(url, {},{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data && response.data.statusCode === 200) {
        toast.success("Order status updated successfully!");
        fetchOrders();
        handleCloseModal();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  
  const handleShowOrderDetails = async (orderNo) => {
    try {
      const response = await axios.get(`${baseUrl}api/Medicines/orderList?Type=UserItems&ID=${orderNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data && response.data.listOrders) {
        setSelectedOrderDetails(response.data.listOrders);
        setShowOrderDetailsModal(true);
      }
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
                <th>Customer Name</th>
                <th>Order Total</th>
                <th>Order Status</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <Button variant="link" onClick={() => handleShowOrderDetails(order.id)}>
                      {order.orderNo}
                    </Button>
                  <td>{order.customerName}</td>
                  <td>{order.orderTotal}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.createdOn}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(order.orderNo)}
                    >
                      Update Status
                    </Button>
                  </td>
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
      
      {/* Modal for updating order status */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="orderStatus">
              <Form.Label>Order No: {selectedOrderNo}</Form.Label>
              <Form.Control as="select" value={selectedOrderStatus} onChange={handleStatusChange}>
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Rejected">Rejected</option>
                <option value="Delivered">Delivered</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Modal for showing order details */}
        <Modal show={showOrderDetailsModal} onHide={handleCloseOrderDetailsModal} className="custom-modal">
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

export default OrderList;
