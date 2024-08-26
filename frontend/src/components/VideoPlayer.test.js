import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

test('renders video player', () => {
  render(<VideoPlayer filename="sample.mp4" />);
  const videoElement = screen.getByRole('video');
  expect(videoElement).toBeInTheDocument();
});
