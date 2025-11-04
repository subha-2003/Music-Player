import React from 'react';
import styled from 'styled-components';
import { PlayArrow, Pause, SkipNext, SkipPrevious, QueueMusic } from '@mui/icons-material';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #515C6F;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    font-size: 24px;
  }
`;

const PlayButton = styled(IconButton)`
  background: linear-gradient(to right, #ff74a4, #9f6ea3);
  padding: 15px;
  color: white;

  &:hover {
    background: linear-gradient(to right, #ff5494, #8f5e93);
  }

  svg {
    font-size: 32px;
  }
`;

const MusicControls = ({ isPlaying, onPlay, onNext, onPrevious, onPlaylistToggle }) => {
  return (
    <ControlsContainer>
      <IconButton onClick={onPrevious} aria-label="Previous track">
        <SkipPrevious />
      </IconButton>
      
      <PlayButton onClick={onPlay} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </PlayButton>
      
      <IconButton onClick={onNext} aria-label="Next track">
        <SkipNext />
      </IconButton>
      
      <IconButton onClick={onPlaylistToggle} aria-label="Show playlist">
        <QueueMusic />
      </IconButton>
    </ControlsContainer>
  );
};

export default MusicControls;