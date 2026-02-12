import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles/simulator.css";

// Core Imports
import { AuthProvider } from './core/auth/AuthContext';
import { StartupScreen } from './components/StartupScreen';
import { MediaGallery } from './components/MediaGallery';

function Root() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <React.StrictMode>
      <AuthProvider>
        {!isBooted ? (
          /* Transitioning from dark image_18d3c0.png */
          <StartupScreen onComplete={() => setIsBooted(true)} />
        ) : (
          /* Main GreenTraX Interface */
          <div className="fade-in bg-[#050505] min-h-screen text-white">
            <MediaGallery />
          </div>
        )}
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
