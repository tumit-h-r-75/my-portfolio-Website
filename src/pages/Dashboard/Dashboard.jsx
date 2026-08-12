import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolderOpen, FaImages, FaLayerGroup, FaRocket } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const cards = [
        {
            title: 'Projects',
            text: 'Review and organize the work shown in your portfolio.',
            icon: <FaFolderOpen />,
            to: '/tumit/75/projects',
        },
        {
            title: 'Skills',
            text: 'Keep technologies, levels, and categories fresh.',
            icon: <FaLayerGroup />,
            to: '/tumit/75/skills',
        },
        {
            title: 'Media',
            text: 'Browse project and skill assets from one place.',
            icon: <FaImages />,
            to: '/tumit/75/media',
        },
    ];

    return (
        <div className="dashboard-page">
            <section className="dashboard-topbar">
                <div>
                    <p className="dashboard-eyebrow">Portfolio Control</p>
                    <h1>Welcome back</h1>
                    <p className="dashboard-muted">Manage your portfolio content from a focused admin workspace.</p>
                </div>
                <span className="dashboard-live-pill">
                    <FaRocket />
                    Live Admin
                </span>
            </section>

            <section className="dashboard-grid">
                {cards.map((card) => (
                    <Link to={card.to} className="dashboard-card" key={card.title}>
                        <span className="dashboard-card-icon">{card.icon}</span>
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default Dashboard;
