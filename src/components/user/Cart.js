import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import axios from "axios";
import { baseUrl } from "../../Utility/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../common/Products.css"; // Import the CSS file
import InnerFooter from "../common/InnerFooter";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const url = `${baseUrl}api/Medicines/cartList?Email=${localStorage.getItem("userEmail")}`;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AccessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.statusCode === 200) {
        setCartItems(response.data.listCart);
      } else {       
          setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Error adding item to cart");
    }
  };

  const removeFromCart = async (id) => {
    try {
      if (window.confirm("Are you sure to delete this item?")) {
        await axios.delete(`${baseUrl}api/Medicines/removeFromCart?ID=${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('AccessToken')}`
          },
        });
        fetchCartItems();
        toast.success("Item removed from cart successfully!");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const placeOrder = async () => {
    try {
      const userId = localStorage.getItem("userID"); // Replace with the actual user ID
      await axios.post(`${baseUrl}api/Medicines/placeOrder?UserID=${userId}`,{}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('AccessToken')}`
        },
      });
      toast.success("Order placed successfully!");
      fetchCartItems(); // Clear the cart items after placing the order
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-4">
          <h2>My Cart</h2>
          <button className="btn btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>
        <div className="row">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.ID} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.ImageUrl}
                    className="product-image"
                    alt={item.MedicineName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.MedicineName}</h5>
                    <p className="card-text">
                      Manufacturer: {item.Manufacturer}
                    </p>
                    <p className="card-text">
                      Unit Price: ${item.UnitPrice.toFixed(2)}
                    </p>
                    <p className="card-text">Discount: {item.Discount}%</p>
                    <p className="card-text">Quantity: {item.Quantity}</p>
                    <p className="card-text">
                      Total Price: ${item.TotalPrice.toFixed(2)}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.ID)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
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
      {/* <InnerFooter/> */}
    </>
  );
};

export default Cart;
