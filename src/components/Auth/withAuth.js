// withAuth.js
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const userEmail = localStorage.getItem('userEmail');
    const userID = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('AccessToken');

    if (!userEmail || !userID || !accessToken) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
