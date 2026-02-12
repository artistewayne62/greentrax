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
