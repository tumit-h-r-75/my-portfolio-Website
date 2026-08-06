import React, { useState, useEffect } from 'react';

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

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Manage Projects</h2>
            <button>Add New Project</button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{project.title}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{project.description.substring(0, 100)}...</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                <button>Edit</button>
                                <button style={{ marginLeft: '5px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProjects;
