import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Dshboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        if (!token) {
          setError('No access token found. Please login again.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${String(import.meta.env.VITE_API_URL)}/getcourse`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleVideoClick = (video) => {
    navigate(`/video/${video._id}`, { state: video });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="no-courses-message">
          No courses available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {data.map((video) => (
        <div
          key={video._id}
          className="dashboard-card"
          onClick={() => handleVideoClick(video)}
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="dashboard-thumbnail"
          />
          <div className="dashboard-card-content">
            <h3 className="dashboard-title">{video.title}</h3>
            <p className="dashboard-subtitle">{video.content[0].subtitle}</p>
            <p className="dashboard-price">${video.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;