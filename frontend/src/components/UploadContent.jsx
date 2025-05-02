import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/UploadContent.css";

const UploadContent = () => {
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
  const [isUploading, setIsUploading] = useState(false); // State to disable button
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state?.formData;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !subtitle) {
      setMessage('Please provide both a subtitle and a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('subtitle', subtitle);
    formData.append('video', file);
    formData.append('title', details.title);
    formData.append('description', details.description);
    formData.append('category', details.category);
    formData.append('price', details.price);

    try {
      setIsUploading(true); // Disable button
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No access token found. Please log in.');
        setIsUploading(false); // Re-enable button
        return;
      }

      const response = await axios.post(
        `${String(import.meta.env.VITE_API_URL)}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted); // Update progress state
          },
        }
      );

      setMessage(response.data.message || 'Content added successfully!');
      setUploadProgress(0); // Reset progress
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading content:', error);
      setMessage('Failed to upload content. Please try again.');
      setUploadProgress(0); // Reset progress
    } finally {
      setIsUploading(false); // Re-enable button
    }
  };

  return (
    <div className="upload-content-container">
      <h1 className="upload-content-title">Add Course Content</h1>
      <form className="upload-content-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subtitle" className="form-label">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            className="form-input"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file" className="form-label">Video File:</label>
          <input
            type="file"
            id="file"
            className="form-input"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="form-button" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploadProgress > 0 && (
        <>
          <p className="redirect-message">Please wait till we redirect you to the dashboard...</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </>
      )}
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default UploadContent;