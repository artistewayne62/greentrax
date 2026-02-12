import { useState } from "react";
import { AuthProvider } from "./core/auth/AuthContext";
import { StartupScreen } from "./components/StartupScreen";
import { MediaGallery } from "./components/MediaGallery";
import RoleSwitcher from "./components/RoleSwitcher";
import MultiDeviceSimulator from "./components/MultiDeviceSimulator";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AuthProvider>
      {!isBooted ? (
        <StartupScreen onComplete={() => setIsBooted(true)} />
      ) : (
        <main className="fade-in">
          {/*actual UI starts*/}
          <h1>Command Center</h1>
          <RoleSwitcher />
          <MediaGallery />
          <MultiDeviceSimulator />
        </main>
      )}
    </AuthProvider>
  );
}
