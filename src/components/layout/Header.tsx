import { Shield, User, ChevronDown, Activity, Zap } from "lucide-react";
import { useAuth } from "../../core/auth/AuthContext";
import { UserRole, getRoleLabel } from "../../core/auth/roles";
import { useState } from "react";
import { cn } from "../../core/utils";

export function Header({ userName = "Operator" }: { userName?: string }) {
  const { role, setRole, roleLabel } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles: (UserRole | 'guest')[] = [
    "guest",
    "visitor_free",
    "visitor_paid",
    "analyst",
    "ranger",
    "ops"
  ];

  return (
    <header className="h-16 border-b border-primary/20 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
      {/* OS Branding */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Shield className="w-6 h-6 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-white">
              GreenTrax<span className="text-primary">.OS</span>
            </h1>
            <span className="text-[8px] font-mono text-primary/60 tracking-tighter">v4.2.0-STABLE // UNIT_09</span>
          </div>
        </div>
        
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        
        {/* System Health (Simulation vs Live Indicator) */}
        <div className="hidden md:flex items-center gap-4 text-[9px] font-mono">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-primary/50" />
            <span className="text-slate-500 uppercase">Latency:</span>
            <span className="text-primary">24ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-primary/50" />
            <span className="text-slate-500 uppercase">Stream:</span>
            <span className={cn(role === 'guest' ? "text-yellow-500" : "text-primary")}>
              {role === 'guest' ? "SIMULATED" : "ENCRYPTED_LIVE"}
            </span>
          </div>
        </div>
      </div>

      {/* Role Switcher (Access Terminal) */}
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg hover:border-primary/40 transition-all group"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-white tracking-wide uppercase">{userName}</span>
            <span className="text-[9px] text-primary/70 font-mono tracking-tighter">{roleLabel}</span>
          </div>
          <div className="p-1.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <User className="w-4 h-4 text-primary" />
          </div>
          <ChevronDown className={cn("w-3 h-3 text-slate-500 transition-transform", isDropdownOpen && "rotate-180")} />
        </button>

        {/* Tactical Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 w-56 bg-slate-950 border border-primary/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 border-b border-primary/10 bg-primary/5">
              <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest">Switch Access Level</span>
            </div>
            <div className="p-1">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-[10px] font-mono uppercase transition-all flex items-center justify-between group",
                    role === r ? "bg-primary text-black" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {r.replace('_', ' ')}
                  {role === r && <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}