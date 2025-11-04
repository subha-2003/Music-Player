import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MusicControls from './components/MusicControls';
import MusicProgress from './components/MusicProgress';
import MusicInfo from './components/MusicInfo';
import Playlist from './components/Playlist';
import AudioVisualizer from './components/AudioVisualizer';
import { allMusic } from './data/musicList';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const PlayerWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 15px;
  }
`;

function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.addEventListener('ended', handleNext);
      
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.removeEventListener('ended', handleNext);
      };
    }
  }, [currentTrack]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % allMusic.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + allMusic.length) % allMusic.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = (value) => {
    if (audioRef.current) {
      const time = (value / 100) * duration;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  return (
    <AppContainer>
      <AudioVisualizer audioRef={audioRef} />
      <PlayerWrapper>
        <audio
          ref={audioRef}
          src={`songs/${allMusic[currentTrack].src}.mp3`}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <MusicInfo
          currentTrack={allMusic[currentTrack]}
          isPlaying={isPlaying}
          togglePlaylist={togglePlaylist}
        />
        
        <MusicProgress
          currentTime={currentTime}
          duration={duration}
          onTimeUpdate={handleTimeUpdate}
        />
        
        <MusicControls
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onPlaylistToggle={togglePlaylist}
        />
        
        {showPlaylist && (
          <Playlist
            tracks={allMusic}
            currentTrack={currentTrack}
            onSelect={selectTrack}
            onClose={togglePlaylist}
          />
        )}
      </PlayerWrapper>
    </AppContainer>
  );
}

export default App;