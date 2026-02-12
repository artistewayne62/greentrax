import React, { createContext, useContext, useState } from "react";

type Role = "admin" | "user" | "guest" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  roleLabel: string; // always a safe string
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
  checkPermission: (required: Role) => boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  // Always provide a safe label
  const roleLabel = role ? role : "guest";

  // Permission logic
  const checkPermission = (required: Role) => {
    if (!role) return false;
    if (role === "admin") return true; // admins can access everything
    return role === required;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        roleLabel,
        setRole,
        login,
        logout,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
