import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/VideoDetails.css';


const VideoDetails = () => {
  const { state: video } = useLocation();

  return (
    <div className="video-details-container">
      <video
        className="video-player"
        controls
        src={video.content[0].url}
      ></video>
      <div className="video-info">
        <h1 className="video-title">{video.title}</h1>
        <p className="video-description">{video.description}</p>
        <p className="video-category">
          <strong>Category:</strong> {video.category}
        </p>
        <p className="video-price">
          <strong>Price:</strong> ${video.price}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails;