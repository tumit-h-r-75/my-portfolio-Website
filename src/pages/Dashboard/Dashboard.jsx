import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>This is a protected area. You can manage your portfolio from here.</p>
            <button onClick={handleLogout} style={{ background: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                Logout
            </button>
            {/* You will add links to other dashboard pages here */}
        </div>
    );
};

export default Dashboard;
