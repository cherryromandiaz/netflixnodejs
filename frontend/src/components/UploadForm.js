import React, { useState } from 'react';
import { uploadVideo } from '../services/api';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    videoFile: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, videoFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append('title', formData.title);
    videoData.append('description', formData.description);
    videoData.append('genre', formData.genre);
    videoData.append('releaseDate', formData.releaseDate);
    videoData.append('video', formData.videoFile);

    try {
      await uploadVideo(videoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Video uploaded successfully');
    } catch (error) {
      alert('Failed to upload video');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />
      <input type="date" name="releaseDate" onChange={handleChange} />
      <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default UploadForm;
