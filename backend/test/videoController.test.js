const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Video = require('../models/Video');
chai.use(chaiHttp);
const { expect } = chai;

describe('Video API', () => {
  beforeEach(async () => {
    await Video.deleteMany({});
  });

  it('should upload a new video', async () => {
    const res = await chai.request(server).post('/api/videos/upload').attach('video', './test/sample.mp4').field({
      title: 'Sample Video',
      description: 'A sample video for testing',
      genre: 'Test',
      releaseDate: '2023-01-01'
    });
    expect(res).to.have.status(200);
  });

  it('should stream a video', async () => {
    const video = new Video({
      title: 'Sample Video',
      description: 'A sample video for testing',
      genre: 'Test',
      releaseDate: '2023-01-01',
      filename: 'sample.mp4',
    });
    await video.save();

    const res = await chai.request(server).get(`/api/videos/stream/${video.filename}`);
    expect(res).to.have.status(200);
    expect(res).to.have.header('Content-Type', 'video/mp4');
  });
});
