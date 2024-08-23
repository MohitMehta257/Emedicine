// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userEmail = localStorage.getItem('userEmail');
  const userID = localStorage.getItem('userID');
  const accessToken = localStorage.getItem('AccessToken');

  if (!userEmail || !userID || !accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
