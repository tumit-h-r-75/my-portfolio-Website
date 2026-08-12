import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

const MediaLibrary = () => {
    const [media, setMedia] = useState({ all: [], projects: [], skills: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const data = await ApiClient.get('/api/media');
                const projects = data.projects || [];
                const skills = data.skills || [];
                setMedia({
                    all: data.all || [...projects, ...skills],
                    projects,
                    skills,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, []);

    const handleDelete = async (publicId) => {
        const confirmed = window.confirm('Delete this image from Cloudinary?');
        if (!confirmed) return;

        try {
            await ApiClient.delete('/api/media', { public_id: publicId });
            setMedia((current) => ({
                all: current.all.filter((image) => image.public_id !== publicId),
                projects: current.projects.filter((image) => image.public_id !== publicId),
                skills: current.skills.filter((image) => image.public_id !== publicId),
            }));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="dashboard-panel dashboard-state">Loading media...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Asset Vault</p>
                    <h1 className="dashboard-page-title">Media Library</h1>
                </div>
            </div>
            
            {[
                { key: 'all', title: 'All Images', empty: 'No images found.' },
                { key: 'projects', title: 'Project Images', empty: 'No project images found.' },
                { key: 'skills', title: 'Skill Images', empty: 'No skill images found.' },
            ].map((section) => (
                <section key={section.key}>
                    <h2 className="dashboard-section-title">{section.title}</h2>
                    <div className="dashboard-media-grid">
                        {media[section.key].map(image => (
                            <div className="dashboard-media-item" key={`${section.key}-${image.public_id}`}>
                                <img src={image.url} alt={section.title} className="dashboard-media-img" />
                                <div className="dashboard-media-meta">{image.folder || 'root'}</div>
                                <button className="dashboard-media-delete" onClick={() => handleDelete(image.public_id)} aria-label="Delete image">
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    {media[section.key].length === 0 && <div className="dashboard-panel dashboard-state dashboard-empty-media">{section.empty}</div>}
                </section>
            ))}
        </div>
    );
};

export default MediaLibrary;
