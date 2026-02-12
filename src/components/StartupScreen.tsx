import React, { useState, useEffect } from 'react';

export const StartupScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay for smoothness
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#000',
      backgroundImage: 'url("/images/startup-bg.png")', // Your uploaded dark image
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#fff',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ letterSpacing: '0.5rem', marginBottom: '2rem' }}>GREENTRAX</h1>
      
      <div style={{ width: '300px', height: '2px', background: '#333' }}>
        <div style={{ 
          width: `${percent}%`, 
          height: '100%', 
          background: '#4ade80', // GreenTraX Green
          boxShadow: '0 0 10px #4ade80',
          transition: 'width 0.1s ease-out'
        }} />
      </div>
      
      <p style={{ marginTop: '1rem', fontSize: '12px', color: '#888' }}>
        INITIALIZING ENCRYPTED UPLINK... {percent}%
      </p>
    </div>
  );
};