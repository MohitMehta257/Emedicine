import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../Login";
import Registration from "../Registration";
import Dashboard from "../user/Dashboard";
import AdminDashboard from "../admin/AdminDashboard";
import UserList from "../admin/UserList";
import MedicineMaster from "../admin/MedicineMaster";
import OrderList from "../common/OrderList";
import Products from "../common/Products";
import Cart from "../user/Cart";
import MyOrders from "../user/MyOrders";
import WelcomePage from "../main/WelcomePage";
import AboutUs from "../main/AboutUs";
import ContactUs from "../main/ContactUs";
import PageNotFound from "../error/PageNotFound";
import Profile from "../common/Profile";
import CommanAboutUS from "../common/CommanAboutUS";
import CommanContactUs from "../common/CommanContactUs";
import ProtectedRoute from '../Auth/ProtectedRoute'; // Import the ProtectedRoute component

const RouterPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/aboutus" element={<CommanAboutUS />} />
        <Route path="/contactus" element={<CommanContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/medicine-master" element={<ProtectedRoute><MedicineMaster /></ProtectedRoute>} />
        <Route path="/order-list" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterPage;
