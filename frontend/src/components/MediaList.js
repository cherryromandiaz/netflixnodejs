import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MediaList = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/media');
        setMedia(response.data);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div>
      <h2>Media List</h2>
      <ul>
        {media.map((item) => (
          <li key={item._id}>{item.title} - {item.genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
