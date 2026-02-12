import { useState } from 'react';
import { AuthProvider } from './core/auth/AuthContext';
import { StartupScreen } from './components/StartupScreen';
import { MediaGallery } from './components/MediaGallery';

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AuthProvider>
      {!isBooted ? (
        <StartupScreen onComplete={() => setIsBooted(true)} />
      ) : (
        <main className="fade-in">
          {/* Your actual UI starts here */}
          <h1>Command Center</h1>
          <MediaGallery />
        </main>
      )}
    </AuthProvider>
  );
}