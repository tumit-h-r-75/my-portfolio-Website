import React, { useState, useEffect } from 'react';
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

const MediaLibrary = () => {
    const [media, setMedia] = useState({ projects: [], skills: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const data = await ApiClient.get('/api/media');
                setMedia(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, []);

    if (loading) return <div className="dashboard-panel dashboard-state">Loading media...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div>
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Asset Vault</p>
                    <h1 className="dashboard-page-title">Media Library</h1>
                </div>
            </div>
            
            <h2 className="dashboard-section-title">Project Images</h2>
            <div className="dashboard-media-grid">
                {media.projects.map(image => (
                    <img key={image.public_id} src={image.url} alt="Project" className="dashboard-media-img" />
                ))}
            </div>
            {media.projects.length === 0 && <div className="dashboard-panel dashboard-state">No project images found.</div>}

            <h2 className="dashboard-section-title">Skill Images</h2>
            <div className="dashboard-media-grid">
                {media.skills.map(image => (
                    <img key={image.public_id} src={image.url} alt="Skill" className="dashboard-media-img" />
                ))}
            </div>
            {media.skills.length === 0 && <div className="dashboard-panel dashboard-state">No skill images found.</div>}
        </div>
    );
};

export default MediaLibrary;
