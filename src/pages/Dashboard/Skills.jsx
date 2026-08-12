import React, { useState, useEffect } from 'react';
import { FaImage, FaPen, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { ApiClient } from './apiClient';

const categories = ['Frontend', 'Backend', 'CMS', 'Database', 'DevOps', 'Other'];

const initialForm = {
    name: '',
    level: '',
    category: 'Frontend',
    image: null,
};

const getSkillImage = (skill) => skill?.imageUrl || skill?.image || '';

const normalizeCategory = (category = '') => {
    const normalized = category.toLowerCase().trim();
    if (normalized === 'frontend') return 'Frontend';
    if (normalized === 'backend') return 'Backend';
    if (normalized === 'cms' || normalized === 'cms & data') return 'CMS';
    if (normalized === 'database' || normalized === 'data') return 'Database';
    if (normalized === 'devops') return 'DevOps';
    return 'Other';
};

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [selectedImagePreview, setSelectedImagePreview] = useState('');
    const [fileInputKey, setFileInputKey] = useState(0);

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

    const openAddForm = () => {
        setEditingSkill(null);
        setForm(initialForm);
        setFormError('');
        setIsFormOpen(true);
    };

    const openEditForm = (skill) => {
        setEditingSkill(skill);
        setForm({
            name: skill.name || '',
            level: skill.level || '',
            category: normalizeCategory(skill.category || 'Frontend'),
            image: null,
        });
        setFormError('');
        setIsFormOpen(true);
    };

    const closeForm = () => {
        if (saving) return;
        setIsFormOpen(false);
        setEditingSkill(null);
        setForm(initialForm);
        setSelectedImagePreview('');
        setFileInputKey((key) => key + 1);
        setFormError('');
    };

    useEffect(() => {
        if (!form.image) {
            setSelectedImagePreview('');
            return undefined;
        }

        const previewUrl = URL.createObjectURL(form.image);
        setSelectedImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [form.image]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((current) => ({
            ...current,
            [name]: files ? files[0] : value,
        }));
    };

    const clearSelectedImage = () => {
        setForm((current) => ({ ...current, image: null }));
        setFileInputKey((key) => key + 1);
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append('name', form.name.trim());
        formData.append('level', form.level);
        formData.append('category', form.category);
        if (form.image) formData.append('image', form.image);
        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        const level = Number(form.level);
        if (!form.name.trim() || !form.category || !level) {
            setFormError('Name, level, and category are required.');
            return;
        }
        if (level < 1 || level > 100) {
            setFormError('Level must be between 1 and 100.');
            return;
        }

        setSaving(true);
        try {
            const payload = buildFormData();
            if (editingSkill) {
                const updated = await ApiClient.put(`/api/skills/${editingSkill._id}`, payload);
                setSkills((current) =>
                    current.map((skill) => (skill._id === updated._id ? updated : skill))
                );
            } else {
                const created = await ApiClient.post('/api/skills', payload);
                setSkills((current) => [created, ...current].sort((a, b) => b.level - a.level));
            }
            closeForm();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (skillId) => {
        const confirmed = window.confirm('Delete this skill from database?');
        if (!confirmed) return;

        try {
            await ApiClient.delete(`/api/skills/${skillId}`);
            setSkills((current) => current.filter((skill) => skill._id !== skillId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="dashboard-panel dashboard-state">Loading skills...</div>;
    if (error) return <div className="dashboard-panel dashboard-state error">Error: {error}</div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-head">
                <div>
                    <p className="dashboard-eyebrow">Stack Library</p>
                    <h1 className="dashboard-page-title">Manage Skills</h1>
                </div>
                <button className="dashboard-primary-btn" onClick={openAddForm}>
                    <FaPlus />
                    Add Skill
                </button>
            </div>

            <div className="dashboard-panel dashboard-table-wrap">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(skill => (
                            <tr key={skill._id}>
                                <td>
                                    {getSkillImage(skill) ? (
                                        <img src={getSkillImage(skill)} alt={skill.name} className="dashboard-thumb" />
                                    ) : (
                                        <span className="dashboard-thumb-placeholder"><FaImage /></span>
                                    )}
                                </td>
                                <td>{skill.name}</td>
                                <td>{skill.level}%</td>
                                <td>{skill.category}</td>
                                <td>
                                    <div className="dashboard-action-row">
                                        <button className="dashboard-action-btn" onClick={() => openEditForm(skill)}><FaPen /> Edit</button>
                                        <button className="dashboard-action-btn danger" onClick={() => handleDelete(skill._id)}><FaTrash /> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {skills.length === 0 && <div className="dashboard-state">No skills found.</div>}
            </div>

            {isFormOpen && (
                <div className="dashboard-modal-backdrop" role="dialog" aria-modal="true">
                    <form className="dashboard-modal" onSubmit={handleSubmit}>
                        <div className="dashboard-modal-head">
                            <div>
                                <p className="dashboard-eyebrow">{editingSkill ? 'Update Skill' : 'New Skill'}</p>
                                <h2>{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
                            </div>
                            <button type="button" className="dashboard-icon-btn" onClick={closeForm} aria-label="Close form">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="dashboard-form-grid">
                            <label className="dashboard-field">
                                <span>Name</span>
                                <input name="name" value={form.name} onChange={handleChange} required />
                            </label>
                            <label className="dashboard-field">
                                <span>Level</span>
                                <input name="level" type="number" min="1" max="100" value={form.level} onChange={handleChange} required />
                            </label>
                            <label className="dashboard-field">
                                <span>Category</span>
                                <select name="category" value={form.category} onChange={handleChange} required>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="dashboard-field">
                                <span>{editingSkill ? 'Replace Image' : 'Skill Image'}</span>
                                <input key={fileInputKey} name="image" type="file" accept="image/*" onChange={handleChange} />
                            </label>
                            {(editingSkill || selectedImagePreview) && (
                                <div className="dashboard-image-preview dashboard-field-full">
                                    {editingSkill && getSkillImage(editingSkill) && (
                                        <div>
                                            <span>Current Image</span>
                                            <img src={getSkillImage(editingSkill)} alt={editingSkill.name} />
                                        </div>
                                    )}
                                    {selectedImagePreview && (
                                        <div>
                                            <span>New Selected Image</span>
                                            <img src={selectedImagePreview} alt="Selected replacement" />
                                            <button type="button" className="dashboard-action-btn" onClick={clearSelectedImage}>
                                                Clear
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {formError && <p className="dashboard-error">{formError}</p>}

                        <div className="dashboard-modal-actions">
                            <button type="button" className="dashboard-action-btn" onClick={closeForm}>Cancel</button>
                            <button type="submit" className="dashboard-primary-btn" disabled={saving}>
                                {saving ? 'Saving...' : editingSkill ? 'Update Skill' : 'Save Skill'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageSkills;
