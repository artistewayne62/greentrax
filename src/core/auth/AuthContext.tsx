import React, { createContext, useContext, useState } from "react";
import { UserRole, getRoleLabel } from "./roles";
import { hasPermission, Permission } from "./permissions";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Requirement: Automatically assigned guest status on open
  const [role, setRole] = useState<UserRole | 'guest'>("guest");

  const checkPermission = (permission: Permission) => hasPermission(role, permission);

  return (
    <AuthContext.Provider value={{ 
      role, 
      setRole, 
      roleLabel: role === 'guest' ? 'Guest' : getRoleLabel(role as UserRole),
      checkPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);