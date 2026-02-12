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
          setTimeout(() => setShowRoleSelect(true), 800); // show role select after boot
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
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      {/* Title */}
      <h1 style={{ letterSpacing: "0.5rem", marginBottom: "2rem" }}>
        GREENTRAX.OS
      </h1>

      {/* Progress Bar */}
      <div style={{ width: "300px", height: "4px", background: "#333" }}>
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

      {/* Status Text */}
      <p style={{ marginTop: "1rem", fontSize: "12px", color: "#888" }}>
        INITIALIZING ENCRYPTED UPLINK... {percent}%
      </p>

      {/* Role Selection */}
      {showRoleSelect && (
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Welcome! Select your role:</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <button
              onClick={() => handleSelectRole("admin")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#111",
                border: "1px solid #4ade80",
                color: "#4ade80",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleSelectRole("user")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#111",
                border: "1px solid #4ade80",
                color: "#4ade80",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              User
            </button>
            <button
              onClick={() => handleSelectRole("guest")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#111",
                border: "1px solid #4ade80",
                color: "#4ade80",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
