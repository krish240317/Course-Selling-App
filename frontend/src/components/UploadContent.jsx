import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadContent = () => {
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
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

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No access token found. Please log in.');
        return;
      }

      const response = await axios.post(
        `${String(import.meta.env.VITE_API_URL)}/upload-video`, // Adjust the endpoint as needed
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || 'Content added successfully!');
      navigate('/dashboard')
    } catch (error) {
      console.error('Error uploading content:', error);
      setMessage('Failed to upload content. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Course Content</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subtitle">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Video File:</label>
          <input
            type="file"
            id="file"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
     
    </div>
  );
};

export default UploadContent;