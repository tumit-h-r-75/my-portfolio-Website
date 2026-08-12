import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../pages/Dashboard/apiClient';
import '../pages/Dashboard/Dashboard.css';

const PrivateRoute = ({ children }) => {
    const [authState, setAuthState] = useState('checking');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthState('logged-out');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                    headers: {
                        'x-auth-token': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Session expired. Please login again.');
                }

                setAuthState('logged-in');
            } catch {
                localStorage.removeItem('token');
                sessionStorage.setItem('dashboardAuthMessage', 'Session expired. Please login again.');
                setAuthState('logged-out');
            }
        };

        verifyToken();
    }, []);

    if (authState === 'checking') {
        return <div className="dashboard-shell"><div className="dashboard-panel dashboard-state">Checking session...</div></div>;
    }

    return authState === 'logged-in' ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
