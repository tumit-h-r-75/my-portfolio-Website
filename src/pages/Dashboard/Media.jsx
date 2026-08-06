import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

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

    const handleDelete = async (publicId, type) => {
        const confirmed = window.confirm('Delete this image from Cloudinary?');
        if (!confirmed) return;

        try {
            await ApiClient.delete('/api/media', { public_id: publicId });
            setMedia((current) => ({
                ...current,
                [type]: current[type].filter((image) => image.public_id !== publicId),
            }));
        } catch (err) {
            setError(err.message);
        }
    };

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
                    <div className="dashboard-media-item" key={image.public_id}>
                        <img src={image.url} alt="Project" className="dashboard-media-img" />
                        <button className="dashboard-media-delete" onClick={() => handleDelete(image.public_id, 'projects')} aria-label="Delete image">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
            {media.projects.length === 0 && <div className="dashboard-panel dashboard-state dashboard-empty-media">No project images found.</div>}

            <h2 className="dashboard-section-title">Skill Images</h2>
            <div className="dashboard-media-grid">
                {media.skills.map(image => (
                    <div className="dashboard-media-item" key={image.public_id}>
                        <img src={image.url} alt="Skill" className="dashboard-media-img" />
                        <button className="dashboard-media-delete" onClick={() => handleDelete(image.public_id, 'skills')} aria-label="Delete image">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
            {media.skills.length === 0 && <div className="dashboard-panel dashboard-state dashboard-empty-media">No skill images found.</div>}
        </div>
    );
};

export default MediaLibrary;
