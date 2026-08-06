import React, { useState } from 'react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a1a', color: 'white' }}>
            <div style={{ padding: '40px', background: '#2a2a2a', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#333', color: 'white' }}
                        />
                    </div>
                    {error && <p style={{ color: '#ff4d4d', marginBottom: '10px' }}>{error}</p>}
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', background: '#007BFF', color: 'white', cursor: 'pointer' }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
