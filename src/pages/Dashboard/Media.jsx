import React, { useState, useEffect } from 'react';

// This would be a shared component
const ApiClient = {
    get: async (url) => {
        const response = await fetch(`http://localhost:5000${url}`, {
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

    if (loading) return <p>Loading media...</p>;
    if (error) return <p>Error: {error}</p>;
    
    const imageContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    };

    const imageStyle = {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
    };

    return (
        <div>
            <h2>Media Library</h2>
            
            <h3>Project Images</h3>
            <div style={imageContainerStyle}>
                {media.projects.map(image => (
                    <img key={image.public_id} src={image.url} alt="Project" style={imageStyle} />
                ))}
            </div>

            <h3 style={{ marginTop: '30px' }}>Skill Images</h3>
            <div style={imageContainerStyle}>
                {media.skills.map(image => (
                    <img key={image.public_id} src={image.url} alt="Skill" style={imageStyle} />
                ))}
            </div>
        </div>
    );
};

export default MediaLibrary;
