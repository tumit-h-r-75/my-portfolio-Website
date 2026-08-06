import React, { useState } from 'react';
import { FaLock, FaSignInAlt } from 'react-icons/fa';
import logo from '../../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png';
import './Dashboard.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(() => {
        const message = sessionStorage.getItem('dashboardAuthMessage') || '';
        sessionStorage.removeItem('dashboardAuthMessage');
        return message;
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://protfolio-back-alpha.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            // --- Authentication Success ---
            // 1. Save the token to localStorage
            localStorage.setItem('token', data.token);

            // 2. Redirect to the dashboard
            // You might need to adjust the path based on your routing setup
            window.location.href = '/tumit/75'; 

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-shell dashboard-login">
            <div className="dashboard-login-card">
                <img src={logo} alt="TumitDev" className="dashboard-login-logo" />
                <p className="dashboard-eyebrow" style={{ textAlign: 'center' }}>Protected Area</p>
                <h1 className="dashboard-login-title">Dashboard Login</h1>
                <p className="dashboard-login-subtitle">Enter your admin password to update portfolio content.</p>

                <form onSubmit={handleSubmit}>
                    <div className="dashboard-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter admin password"
                        />
                    </div>
                    {error && <p className="dashboard-error">{error}</p>}
                    <button type="submit" disabled={loading} className="dashboard-primary-btn dashboard-login-button">
                        {loading ? <FaLock /> : <FaSignInAlt />}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
