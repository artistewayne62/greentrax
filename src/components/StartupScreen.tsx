import React, { useState, useEffect } from "react";
import { useAuth } from "../core/auth/AuthContext";

interface Props {
  onComplete: () => void;
}

export const StartupScreen: React.FC<Props> = ({ onComplete }) => {
  const { setRole, login } = useAuth();
  const [percent, setPercent] = useState(0);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowRoleSelect(true), 500); // show role select after boot
          return 100;
        }
        return prev + 2; // Adjust speed
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSelectRole = (role: "admin" | "user" | "guest") => {
    setRole(role);
    login();
    onComplete();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "monospace",
      }}
    >
      {!showRoleSelect ? (
        <>
          <h1 style={{ letterSpacing: "0.5rem", marginBottom: "2rem" }}>
            GREENTRAX
          </h1>
          <div style={{ width: "300px", height: "2px", background: "#333" }}>
            <div
              style={{
                width: `${percent}%`,
                height: "100%",
                background: "#4ade80",
                boxShadow: "0 0 10px #4ade80",
                transition: "width 0.1s ease-out",
              }}
            />
          </div>
          <p style={{ marginTop: "1rem", fontSize: "12px", color: "#888" }}>
            INITIALIZING ENCRYPTED UPLINK... {percent}%
          </p>
        </>
      ) : (
        <>
          <h2>Welcome! Select your role:</h2>
          <div className="role-buttons">
            <button onClick={() => handleSelectRole("admin")}>Admin</button>
            <button onClick={() => handleSelectRole("user")}>User</button>
            <button onClick={() => handleSelectRole("guest")}>Guest</button>
          </div>
        </>
      )}
    </div>
  );
};
