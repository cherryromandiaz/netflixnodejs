const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, genre, releaseDate } = req.body;
    const video = new Video({
      title,
      description,
      genre,
      releaseDate,
      filePath: req.file.path,
      thumbnailPath: `/thumbnails/${req.file.filename}.png`,
      uploadedBy: req.user.id
    });

    // Generate thumbnail
    ffmpeg(req.file.path)
      .screenshots({
        timestamps: ['50%'],
        filename: `${req.file.filename}.png`,
        folder: path.join(__dirname, '../thumbnails'),
        size: '320x240'
      });

    await video.save();
    res.status(201).send('Video uploaded');
  } catch (error) {
    res.status(500).send('Error uploading video');
  }
};

exports.streamVideo = (req, res) => {
  const filePath = path.join(__dirname, '../videos', req.params.filename);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('File not found');
    }

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = Math.min(start + 999999, stats.size - 1);

      const stream = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4'
      };

      res.writeHead(206, head);
      stream.pipe(res);
    } else {
      const head = {
        'Content-Length': stats.size,
        'Content-Type': 'video/mp4'
      };

      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  });
};

exports.getVideoDetails = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploadedBy', 'username');
    if (!video) {
      return res.status(404).send('Video not found');
    }
    res.json(video);
  } catch (error) {
    res.status(500).send('Error retrieving video details');
  }
};

exports.searchVideos = async (req, res) => {
  try {
    const query = req.params.query;
    const videos = await Video.find({ title: { $regex: query, $options: 'i' } });
    res.json(videos);
  } catch (error) {
    res.status(500).send('Error searching videos');
  }
};
