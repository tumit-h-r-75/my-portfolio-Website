import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFolderOpen, FaImages, FaLayerGroup, FaRocket, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: null, skills: null, media: null });
    const [recentProjects, setRecentProjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;

        Promise.allSettled([
            ApiClient.get('/api/projects'),
            ApiClient.get('/api/skills'),
            ApiClient.get('/api/media'),
        ]).then(([projectsRes, skillsRes, mediaRes]) => {
            if (!mounted) return;

            const projects = projectsRes.status === 'fulfilled' ? projectsRes.value : [];
            const skills = skillsRes.status === 'fulfilled' ? skillsRes.value : [];
            const media = mediaRes.status === 'fulfilled' ? mediaRes.value : null;

            setStats({
                projects: projectsRes.status === 'fulfilled' ? projects.length : null,
                skills: skillsRes.status === 'fulfilled' ? skills.length : null,
                media: media ? (media.all || []).length : null,
            });
            setRecentProjects(projects.slice(0, 4));

            if (projectsRes.status === 'rejected' && skillsRes.status === 'rejected') {
                setError('Unable to reach the server. Showing an empty workspace.');
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    const cards = [
        {
            title: 'Projects',
            text: 'Review and organize the work shown in your portfolio.',
            icon: <FaFolderOpen />,
            to: '/tumit/75/projects',
            stat: stats.projects,
        },
        {
            title: 'Skills',
            text: 'Keep technologies, levels, and categories fresh.',
            icon: <FaLayerGroup />,
            to: '/tumit/75/skills',
            stat: stats.skills,
        },
        {
            title: 'Media',
            text: 'Browse project and skill assets from one place.',
            icon: <FaImages />,
            to: '/tumit/75/media',
            stat: stats.media,
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

            {error && <p className="dashboard-error">{error}</p>}

            <section className="dashboard-grid">
                {cards.map((card) => (
                    <Link to={card.to} className="dashboard-card" key={card.title}>
                        <div className="dashboard-card-top">
                            <span className="dashboard-card-icon">{card.icon}</span>
                            <span className="dashboard-card-stat">{card.stat === null ? '—' : card.stat}</span>
                        </div>
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                    </Link>
                ))}
            </section>

            <section className="dashboard-quick-actions">
                <Link to="/tumit/75/projects" className="dashboard-action-btn">
                    <FaPlus /> Add Project
                </Link>
                <Link to="/tumit/75/skills" className="dashboard-action-btn">
                    <FaPlus /> Add Skill
                </Link>
                <a href="/" target="_blank" rel="noreferrer" className="dashboard-action-btn">
                    <FaExternalLinkAlt /> View Live Site
                </a>
            </section>

            <section>
                <h2 className="dashboard-section-title">Recently Added Projects</h2>
                <div className="dashboard-panel dashboard-table-wrap">
                    {recentProjects.length === 0 ? (
                        <div className="dashboard-state">No projects yet. Add your first one from the Projects tab.</div>
                    ) : (
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Live Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProjects.map((project) => (
                                    <tr key={project._id}>
                                        <td>
                                            {(project.imageUrl || project.image) ? (
                                                <img src={project.imageUrl || project.image} alt={project.title} className="dashboard-thumb" />
                                            ) : (
                                                <span className="dashboard-thumb-placeholder"><FaFolderOpen /></span>
                                            )}
                                        </td>
                                        <td>{project.title}</td>
                                        <td>
                                            {project.liveLink ? (
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className="dashboard-action-btn">
                                                    <FaExternalLinkAlt /> Visit
                                                </a>
                                            ) : (
                                                <span className="dashboard-muted">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
