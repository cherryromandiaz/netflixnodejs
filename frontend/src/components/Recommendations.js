import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = ({ userId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/recommendations/${userId}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching recommendations', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommended For You</h2>
      <ul>
        {videos.map(video => (
          <li key={video.videoId}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
