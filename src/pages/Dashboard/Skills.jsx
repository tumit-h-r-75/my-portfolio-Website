import React, { useState, useEffect } from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import './Dashboard.css';

// This would be a shared component
const ApiClient = {
    get: async (url) => {
        const response = await fetch(`https://protfolio-back-alpha.vercel.app${url}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    },
    // You'd add post, put, delete methods here
};


const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await ApiClient.get('/api/skills');
                setSkills(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <div className="dashboard-panel dashboard-state">Loading skills...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div>
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Stack Library</p>
                    <h1 className="dashboard-page-title">Manage Skills</h1>
                </div>
                <button className="dashboard-primary-btn">
                    <FaPlus />
                    Add Skill
                </button>
            </div>

            <div className="dashboard-panel dashboard-table-wrap">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(skill => (
                            <tr key={skill._id}>
                                <td>{skill.name}</td>
                                <td>{skill.level}%</td>
                                <td>{skill.category}</td>
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
                {skills.length === 0 && <div className="dashboard-state">No skills found.</div>}
            </div>
        </div>
    );
};

export default ManageSkills;
