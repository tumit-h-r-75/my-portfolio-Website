import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        // You could add more validation here, like checking token expiration
        return token ? true : false;
    };

    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
