import React from 'react';
import styled from 'styled-components';
import { MoreVert, ExpandMore } from '@mui/icons-material';

const Container = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #515C6F;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Title = styled.span`
  color: #515C6F;
  font-size: 18px;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TrackName = styled.h2`
  color: #515C6F;
  font-size: 24px;
  margin: 10px 0;
  font-weight: 600;
`;

const ArtistName = styled.p`
  color: #515C6F;
  font-size: 16px;
  opacity: 0.8;
`;

const MusicInfo = ({ currentTrack, isPlaying, togglePlaylist }) => {
  return (
    <Container>
      <TopBar>
        <IconButton onClick={togglePlaylist}>
          <ExpandMore />
        </IconButton>
        <Title>Now Playing</Title>
        <IconButton>
          <MoreVert />
        </IconButton>
      </TopBar>

      <ImageContainer>
        <Image
          src={`images/${currentTrack.img}`}
          alt={currentTrack.name}
          className={isPlaying ? 'rotating' : ''}
        />
      </ImageContainer>

      <TrackName>{currentTrack.name}</TrackName>
      <ArtistName>{currentTrack.artist}</ArtistName>
    </Container>
  );
};

export default MusicInfo;