import { useState } from "react";
import { AuthProvider } from "./core/auth/AuthContext";
import { StartupScreen } from "./components/StartupScreen";
import RoleSwitcher from "./components/RoleSwitcher";
import Dashboard from "./components/Dashboard";
import "./styles/simulator.css";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AuthProvider>
      {!isBooted ? (
        <StartupScreen onComplete={() => setIsBooted(true)} />
      ) : (
        <main className="fade-in">
          <h1>Command Center</h1>
          <RoleSwitcher />
          <Dashboard />
        </main>
      )}
    </AuthProvider>
  );
}
