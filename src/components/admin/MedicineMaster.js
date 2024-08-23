import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { baseUrl } from "../../Utility/constants";
import Header from "../common/Header";
import moment from 'moment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InnerFooter from "../common/InnerFooter";

const MedicinesComponent = () => {
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // New state to track edit mode
  const [selectedMedicineId, setSelectedMedicineId] = useState(null); // New state to track selected medicine for editing
  const [medicine, setMedicine] = useState({
    name: "",
    manufacturer: "",
    unitPrice: "",
    discount: "",
    quantity: "",
    expDate: "",
    imageUrl: null,
  });

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/Admin/getMedicines`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response && response.data && response.data.listMedicines) {
        setMedicines(response.data.listMedicines);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setMedicine({
      name: "",
      manufacturer: "",
      unitPrice: "",
      discount: "",
      quantity: "",
      expDate: "",
      imageUrl: null,
    });
    setEditMode(false); // Reset edit mode when closing modal
    setSelectedMedicineId(null); // Reset selected medicine ID
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicine({
      ...medicine,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setMedicine({
      ...medicine,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();    
    formData.append("id", editMode ? selectedMedicineId : 0);
    formData.append("name", medicine.name);
    formData.append("manufacturer", medicine.manufacturer);
    formData.append("unitPrice", medicine.unitPrice);
    formData.append("discount", medicine.discount);
    formData.append("quantity", medicine.quantity);
    formData.append("expDate", medicine.expDate);
    formData.append("type", editMode ? "Update" : "Add"); // Use "Update" type if edit mode is true
    formData.append("status", 1);
    if (medicine.image) {
      formData.append("imageUrl", medicine.image);
    }

    try {
      const url = `${baseUrl}api/Admin/addUpdateMedicine`;
      const response = await axios.post(url, formData, {
        headers: {
           "Authorization": `Bearer ${localStorage.getItem('AccessToken')}`
        },
      });
      if (response && response.data && response.data.statusCode === 200) {
        handleCloseModal();
        fetchMedicines();
        toast.success(editMode ? "Product updated successfully!" : "Product added successfully!");
      } else {
        console.error("Error adding/updating medicine:", response.data);
      }
    } catch (error) {
      console.error("Error adding/updating medicine:", error);
    }
  };

  const handleEdit = (medicineId) => {
    const selectedMedicine = medicines.find(med => med.id === medicineId);
    if (selectedMedicine) {
      setEditMode(true);
      setSelectedMedicineId(medicineId);
      setMedicine({
        name: selectedMedicine.name,
        manufacturer: selectedMedicine.manufacturer,
        unitPrice: selectedMedicine.unitPrice,
        discount: selectedMedicine.discount,
        quantity: selectedMedicine.quantity,
        expDate: selectedMedicine.expDate,
        imageUrl: selectedMedicine.imageUrl,
      });
      handleShowModal();
    }
  };

  const handleDelete = async (medicineId) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        const response = await axios.delete(`${baseUrl}api/Admin/deleteMedicine?id=${medicineId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('AccessToken')}`
          },
        });
        if (response && response.data && response.data.statusCode === 200) {
          fetchMedicines();
          toast.success("Product deleted successfully!");
        } else {
          console.error("Error deleting medicine:", response.data);
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        {/* Button to show the modal */}
        <Button variant="primary mb-1" onClick={handleShowModal}>
          Add Medicine
        </Button>

        {/* Modal for adding/updating medicine */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? "Edit Medicine" : "Add Medicine"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={medicine.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manufacturer" className="form-label">
                  Manufacturer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturer"
                  name="manufacturer"
                  value={medicine.manufacturer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitPrice" className="form-label">
                  Unit Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitPrice"
                  name="unitPrice"
                  value={medicine.unitPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">
                  Discount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="discount"
                  name="discount"
                  value={medicine.discount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={medicine.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expDate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="expDate"
                  name="expDate"
                  value={medicine.expDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Medicine Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="imageUrl"
                  onChange={handleFileChange}
                />
              </div>
              <Button variant="primary" type="submit">
                {editMode ? "Update" : "Save"}
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Table to display medicines */}
        <table className="table table-striped table-hover table-bordered">
          <thead>
          <tr className="table-dark">
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.manufacturer}</td>
                <td>{medicine.unitPrice}</td>
                <td>{medicine.discount}</td>
                <td>{medicine.quantity}</td>
                <td> 
                  <img
                    src={medicine.imageUrl}
                    alt={medicine.name}
                    title={medicine.name}
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                </td>
                <td>{ medicine.expDate.substring(0,10)}</td>
                <td>
                  {/* Add Edit/Delete buttons */}
                  <Button variant="info" className="me-2" onClick={() => handleEdit(medicine.id)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(medicine.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      <InnerFooter />
    </>
  );
};
export default MedicinesComponent;

