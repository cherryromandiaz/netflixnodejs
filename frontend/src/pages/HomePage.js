import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import UploadForm from '../components/UploadForm';

const HomePage = () => {
  const [selectedVideo, setSelectedVideo] = useState('');

  return (
    <div>
      <UploadForm />
      {selectedVideo && <VideoPlayer filename={selectedVideo} />}
    </div>
  );
};

export default HomePage;
