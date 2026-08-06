import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaFolderOpen, FaImages, FaLayerGroup, FaPowerOff } from 'react-icons/fa';
import logo from '../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png';
import '../pages/Dashboard/Dashboard.css';

const navItems = [
    { to: '/tumit/75/projects', label: 'Projects', icon: <FaFolderOpen /> },
    { to: '/tumit/75/skills', label: 'Skills', icon: <FaLayerGroup /> },
    { to: '/tumit/75/media', label: 'Media', icon: <FaImages /> },
];

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-shell">
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="dashboard-brand">
                        <img src={logo} alt="TumitDev" className="dashboard-brand-mark" />
                        <div>
                            <p className="dashboard-eyebrow">Admin Studio</p>
                            <h2 className="dashboard-title">Dashboard</h2>
                        </div>
                    </div>

                    <nav className="dashboard-nav" aria-label="Dashboard">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `dashboard-nav-link${isActive ? ' active' : ''}`
                                }
                            >
                                <span className="dashboard-nav-icon">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <button onClick={handleLogout} className="dashboard-logout">
                        <FaPowerOff />
                        Logout
                    </button>
                </aside>

                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
