import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const sidebarStyle = {
        width: '250px',
        background: '#2c3e50',
        color: 'white',
        height: '100vh',
        padding: '20px',
        position: 'fixed',
    };

    const contentStyle = {
        marginLeft: '270px',
        padding: '20px',
    };

    const linkStyle = {
        display: 'block',
        color: 'white',
        padding: '10px 15px',
        textDecoration: 'none',
        borderRadius: '5px',
        marginBottom: '10px',
    };

    return (
        <div>
            <div style={sidebarStyle}>
                <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Dashboard</h2>
                <nav>
                    <Link to="/tumit/75/projects" style={linkStyle}>Manage Projects</Link>
                    <Link to="/tumit/75/skills" style={linkStyle}>Manage Skills</Link>
                    <Link to="/tumit/75/media" style={linkStyle}>Media Library</Link>
                </nav>
                <button 
                    onClick={handleLogout} 
                    style={{ position: 'absolute', bottom: '20px', background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>
            <main style={contentStyle}>
                <Outlet /> {/* This will render the nested child routes */}
            </main>
        </div>
    );
};

export default DashboardLayout;
