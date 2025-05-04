import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
        const response = await axios.get(`${String(import.meta.env.VITE_API_URL)}/getcourse`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error('Failed to fetch courses:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/video/${video._id}`, { state: video });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {data.map((video) => (
        <div
          key={video._id}
          style={{
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={() => handleVideoClick(video)}
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '10px' }}>
            <h3 style={{ fontSize: '18px', margin: '0 0 10px' }}>{video.title}</h3>
            <p style={{ margin: '0 0 10px', color: '#555' }}>{video.content[0].subtitle}</p>
            <p style={{ margin: '0', fontWeight: 'bold' }}>${video.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;