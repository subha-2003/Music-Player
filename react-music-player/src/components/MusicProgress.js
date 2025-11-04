import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  margin: 20px 0;
`;

const ProgressBar = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: #f0f0f0;
  border-radius: 3px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #ff74a4;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, #ff74a4 var(--progress), #f0f0f0 var(--progress));
    border-radius: 3px;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  color: #515C6F;
  font-size: 14px;
  margin-top: 5px;
`;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const MusicProgress = ({ currentTime, duration, onTimeUpdate }) => {
  const progress = (currentTime / duration) * 100 || 0;

  return (
    <ProgressContainer>
      <ProgressBar
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onTimeUpdate(parseFloat(e.target.value))}
        style={{ '--progress': `${progress}%` }}
      />
      <TimeDisplay>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </TimeDisplay>
    </ProgressContainer>
  );
};

export default MusicProgress;