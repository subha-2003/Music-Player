import React from 'react';
import styled from 'styled-components';
import { Close, MusicNote } from '@mui/icons-material';

const PlaylistContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

const PlaylistContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  color: #515C6F;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #515C6F;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrackItem = styled.li`
  padding: 12px;
  margin: 8px 0;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${props => props.active ? '#f8f9fa' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const TrackInfo = styled.div`
  flex: 1;
`;

const TrackName = styled.div`
  color: #515C6F;
  font-weight: ${props => props.active ? '600' : '400'};
`;

const ArtistName = styled.div`
  color: #515C6F;
  font-size: 14px;
  opacity: 0.8;
`;

const Playlist = ({ tracks, currentTrack, onSelect, onClose }) => {
  return (
    <PlaylistContainer onClick={onClose}>
      <PlaylistContent onClick={e => e.stopPropagation()}>
        <Header>
          <Title>
            <MusicNote /> Playlist
          </Title>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Header>

        <TrackList>
          {tracks.map((track, index) => (
            <TrackItem
              key={index}
              active={index === currentTrack}
              onClick={() => onSelect(index)}
            >
              <TrackInfo>
                <TrackName active={index === currentTrack}>{track.name}</TrackName>
                <ArtistName>{track.artist}</ArtistName>
              </TrackInfo>
            </TrackItem>
          ))}
        </TrackList>
      </PlaylistContent>
    </PlaylistContainer>
  );
};

export default Playlist;