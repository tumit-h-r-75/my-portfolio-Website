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

    if (loading) return <p>Loading skills...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Manage Skills</h2>
            <button>Add New Skill</button>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Level</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map(skill => (
                        <tr key={skill._id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skill.name}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skill.level}%</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skill.category}</td>
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

export default ManageSkills;
