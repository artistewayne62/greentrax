import React from 'react';
import { useAuth } from '../core/auth/AuthContext';
import { UserRole } from '../core/auth/roles';

export const RoleSwitcher = () => {
  const { role, setRole, roleLabel } = useAuth();

  const roles: (UserRole | 'guest')[] = [
    'guest', 
    'visitor_free', 
    'visitor_paid', 
    'analyst', 
    'ranger', 
    'ops'
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col">
        <span className="text-[10px] text-zinc-500 uppercase font-bold">Active Authorization</span>
        <span className="text-sm font-mono text-green-400 uppercase">{roleLabel}</span>
      </div>
      
      <div className="h-8 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />

      <div className="flex gap-2">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3 py-1 text-[10px] font-mono border transition-all ${
              role === r 
                ? 'bg-green-600 border-green-400 text-white shadow-[0_0_10px_rgba(74,222,128,0.3)]' 
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            {r.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};