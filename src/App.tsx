import { useState } from "react";
import { AuthProvider, useAuth } from "./core/auth/AuthContext";
import { StartupScreen } from "./components/StartupScreen";
import { MediaGallery } from "./components/MediaGallery";
import RoleSwitcher from "./components/RoleSwitcher";
import MultiDeviceSimulator from "./components/MultiDeviceSimulator";

function MainUI() {
  const { role } = useAuth();

  return (
    <main className="fade-in">
      <h1>Command Center</h1>
      <RoleSwitcher />
      {role === "admin" && (
        <>
          <p>You have admin privileges.</p>
          <MultiDeviceSimulator role={role} />
        </>
      )}
      {role === "user" && (
        <>
          <MediaGallery />
          <MultiDeviceSimulator role={role} />
        </>
      )}
      {role === "guest" && (
        <p>Guest access: limited view only.</p>
      )}
    </main>
  );
}

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AuthProvider>
      {!isBooted ? (
        <StartupScreen onComplete={() => setIsBooted(true)} />
      ) : (
        <MainUI />
      )}
    </AuthProvider>
  );
}
