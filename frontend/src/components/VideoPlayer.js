import React, { useEffect, useState } from 'react';
import { streamVideo } from '../services/api';

const VideoPlayer = ({ filename }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await streamVideo(filename);
      setVideoUrl(URL.createObjectURL(response.data));
    };
    fetchVideo();
  }, [filename]);

  return (
    <div>
      <video controls src={videoUrl} width="600" />
    </div>
  );
};

export default VideoPlayer;
