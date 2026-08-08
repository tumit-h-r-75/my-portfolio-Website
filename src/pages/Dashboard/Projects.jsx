import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTimes, FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

const initialForm = {
    title: '',
    description: '',
    liveLink: '',
    githubLink: '',
    tags: '',
    features: '',
    challenges: '',
    futurePlans: '',
    image: null,
};

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [form, setForm] = useState(initialForm);

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

    const openAddForm = () => {
        setEditingProject(null);
        setForm(initialForm);
        setFormError('');
        setIsFormOpen(true);
    };

    const openEditForm = (project) => {
        setEditingProject(project);
        setForm({
            title: project.title || '',
            description: project.description || '',
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
            tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
            features: Array.isArray(project.features) ? project.features.join(', ') : '',
            challenges: project.challenges || '',
            futurePlans: project.futurePlans || '',
            image: null,
        });
        setFormError('');
        setIsFormOpen(true);
    };

    const closeForm = () => {
        if (saving) return;
        setIsFormOpen(false);
        setEditingProject(null);
        setForm(initialForm);
        setFormError('');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((current) => ({
            ...current,
            [name]: files ? files[0] : value,
        }));
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append('title', form.title.trim());
        formData.append('description', form.description.trim());
        formData.append('liveLink', form.liveLink.trim());
        formData.append('githubLink', form.githubLink.trim());
        formData.append('tags', form.tags.trim());
        formData.append('features', form.features.trim());
        formData.append('challenges', form.challenges.trim());
        formData.append('futurePlans', form.futurePlans.trim());
        if (form.image) formData.append('image', form.image);
        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!form.title.trim() || !form.description.trim()) {
            setFormError('Title and description are required.');
            return;
        }

        if (!editingProject && !form.image) {
            setFormError('Project image is required for a new project.');
            return;
        }

        setSaving(true);
        try {
            const payload = buildFormData();
            if (editingProject) {
                const updated = await ApiClient.put(`/api/projects/${editingProject._id}`, payload);
                setProjects((current) =>
                    current.map((project) => (project._id === updated._id ? updated : project))
                );
            } else {
                const created = await ApiClient.post('/api/projects', payload);
                setProjects((current) => [created, ...current]);
            }
            closeForm();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (projectId) => {
        const confirmed = window.confirm('Delete this project from database?');
        if (!confirmed) return;

        try {
            await ApiClient.delete(`/api/projects/${projectId}`);
            setProjects((current) => current.filter((project) => project._id !== projectId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="dashboard-panel dashboard-state">Loading projects...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div>
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Portfolio Work</p>
                    <h1 className="dashboard-page-title">Manage Projects</h1>
                </div>
                <button className="dashboard-primary-btn" onClick={openAddForm}>
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
                                        <button className="dashboard-action-btn" onClick={() => openEditForm(project)}><FaPen /> Edit</button>
                                        <button className="dashboard-action-btn danger" onClick={() => handleDelete(project._id)}><FaTrash /> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && <div className="dashboard-state">No projects found.</div>}
            </div>

            {isFormOpen && (
                <div className="dashboard-modal-backdrop" role="dialog" aria-modal="true">
                    <form className="dashboard-modal" onSubmit={handleSubmit}>
                        <div className="dashboard-modal-head">
                            <div>
                                <p className="dashboard-eyebrow">{editingProject ? 'Update Work' : 'New Work'}</p>
                                <h2>{editingProject ? 'Edit Project' : 'Add Project'}</h2>
                            </div>
                            <button type="button" className="dashboard-icon-btn" onClick={closeForm} aria-label="Close form">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="dashboard-form-grid">
                            <label className="dashboard-field">
                                <span>Title</span>
                                <input name="title" value={form.title} onChange={handleChange} required />
                            </label>
                            <label className="dashboard-field">
                                <span>Tags</span>
                                <input name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node, MongoDB" />
                            </label>
                            <label className="dashboard-field">
                                <span>Live Link</span>
                                <input name="liveLink" value={form.liveLink} onChange={handleChange} />
                            </label>
                            <label className="dashboard-field">
                                <span>GitHub Link</span>
                                <input name="githubLink" value={form.githubLink} onChange={handleChange} />
                            </label>
                            <label className="dashboard-field dashboard-field-full">
                                <span>Description</span>
                                <textarea name="description" value={form.description} onChange={handleChange} rows="5" required />
                            </label>
                            <label className="dashboard-field dashboard-field-full">
                                <span>Features</span>
                                <input name="features" value={form.features} onChange={handleChange} placeholder="Smart search, Authentication, Dashboard" />
                            </label>
                            <label className="dashboard-field dashboard-field-full">
                                <span>Challenges</span>
                                <textarea name="challenges" value={form.challenges} onChange={handleChange} rows="3" />
                            </label>
                            <label className="dashboard-field dashboard-field-full">
                                <span>Future Plans</span>
                                <textarea name="futurePlans" value={form.futurePlans} onChange={handleChange} rows="3" />
                            </label>
                            <label className="dashboard-field dashboard-field-full">
                                <span>{editingProject ? 'Replace Image' : 'Project Image'}</span>
                                <input name="image" type="file" accept="image/*" onChange={handleChange} required={!editingProject} />
                            </label>
                        </div>

                        {formError && <p className="dashboard-error">{formError}</p>}

                        <div className="dashboard-modal-actions">
                            <button type="button" className="dashboard-action-btn" onClick={closeForm}>Cancel</button>
                            <button type="submit" className="dashboard-primary-btn" disabled={saving}>
                                {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
