import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  background: #000;  // Dark base for better color visibility
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(30px);
    transform: scale(1.1);
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const AudioVisualizer = ({ audioRef }) => {
  const canvasRef = useRef(null);
  const analyzerRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzerRef.current = analyzer;
    
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    
    analyzer.fftSize = 256;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const background = backgroundRef.current;

    const getAverageColor = (data) => {
      // Enhanced frequency band divisions for better color distribution
      const bassRange = data.slice(0, 8);  // Low frequencies (bass)
      const midRange = data.slice(8, 24);  // Mid frequencies
      const trebleRange = data.slice(24, 48); // High frequencies (treble)

      // Calculate average energy for each frequency range
      const bassEnergy = bassRange.reduce((a, b) => a + b, 0) / bassRange.length;
      const midEnergy = midRange.reduce((a, b) => a + b, 0) / midRange.length;
      const trebleEnergy = trebleRange.reduce((a, b) => a + b, 0) / trebleRange.length;

      // Enhanced color mapping with better sensitivity
      const r = Math.floor(((bassEnergy / 255) * 255) * 1.5);    // Emphasize bass in red
      const g = Math.floor(((midEnergy / 255) * 255) * 1.3);     // Emphasize mids in green
      const b = Math.floor(((trebleEnergy / 255) * 255) * 1.2);  // Slight emphasis on treble

      // Ensure values stay within valid RGB range (0-255)
      return {
        r: Math.min(255, Math.max(0, r)),
        g: Math.min(255, Math.max(0, g)),
        b: Math.min(255, Math.max(0, b))
      };
    };

    // Add smoothing for color transitions
    let currentColors = { r: 0, g: 0, b: 0 };
    const smoothingFactor = 0.15; // Adjust for slower/faster transitions

    const smoothColor = (target, current) => {
      return current + (target - current) * smoothingFactor;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      analyzer.getByteFrequencyData(dataArray);

      // Get new target colors
      const targetColors = getAverageColor(dataArray);
      
      // Smooth the color transition
      currentColors.r = smoothColor(targetColors.r, currentColors.r);
      currentColors.g = smoothColor(targetColors.g, currentColors.g);
      currentColors.b = smoothColor(targetColors.b, currentColors.b);

      // Clear canvas with a fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update background with current smoothed colors
      const { r, g, b } = currentColors;
      background.style.background = `
        radial-gradient(
          circle at center,
          rgba(${r}, ${g}, ${b}, 0.8) 0%,
          rgba(${r * 0.8}, ${g * 0.8}, ${b * 0.8}, 0.6) 50%,
          rgba(${r * 0.6}, ${g * 0.6}, ${b * 0.6}, 0.4) 100%
        )
      `;

      // Draw frequency bars with enhanced visualization
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i] / 255;
        const barHeight = amplitude * (canvas.height * 0.7); // 70% of canvas height
        
        // Create dynamic gradient for bars
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${amplitude * 0.8})`);
        gradient.addColorStop(1, `rgba(${r * 1.2}, ${g * 1.2}, ${b * 1.2}, ${amplitude})`);
        
        // Draw bar with rounded corners
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 5);
        ctx.fillStyle = gradient;
        ctx.fill();

        x += barWidth;
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (source) {
        source.disconnect();
      }
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioRef]);

  return (
    <BackgroundContainer ref={backgroundRef}>
      <Canvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default AudioVisualizer;