import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await ApiClient.get('/api/projects');
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div className="dashboard-panel dashboard-state">Loading projects...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div>
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Portfolio Work</p>
                    <h1 className="dashboard-page-title">Manage Projects</h1>
                </div>
                <button className="dashboard-primary-btn">
                    <FaPlus />
                    Add Project
                </button>
            </div>

            <div className="dashboard-panel dashboard-table-wrap">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id}>
                                <td>{project.title}</td>
                                <td>{project.description?.substring(0, 100)}...</td>
                                <td>
                                    <div className="dashboard-action-row">
                                        <button className="dashboard-action-btn"><FaPen /> Edit</button>
                                        <button className="dashboard-action-btn danger"><FaTrash /> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && <div className="dashboard-state">No projects found.</div>}
            </div>
        </div>
    );
};

export default ManageProjects;
