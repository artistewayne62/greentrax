import { AlertTriangle, Clock, Radio, ShieldAlert, Plus, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../core/auth/AuthContext";
import { useRealtimeActions } from "../core/useRealtimeActions";
import { cn } from "../core/utils";

export function ActionHub() {
  const { role, checkPermission } = useAuth();
  const { logEvent, dispatchUnits } = useRealtimeActions();
  
  // Simulated Log Data
  const [logs] = useState([
    { id: 1, title: "RGR-ALPHA", msg: "Visual on Elephant Herd", time: "10:12", type: "unit" },
    { id: 2, title: "SYS-ALERT", msg: "Drone Battery Low - Sec B2", time: "09:45", type: "alert" },
    { id: 3, title: "ANL-DATA", msg: "Movement Pattern: North", time: "09:30", type: "intel" },
  ]);

  const canLog = checkPermission('TRANSMIT_RANGER_ANALYST');
  const isOps = role === 'ops';

  return (
    <div className="flex flex-col h-full bg-slate-950/60 border border-primary/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-primary/10 bg-black/40 flex justify-between items-center">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Tactical Action Hub</h2>
          <p className="text-[9px] text-slate-500 font-mono mt-0.5">AUTH_LVL: <span className="text-primary/80">{role.toUpperCase()}</span></p>
        </div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Log Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="group p-2.5 rounded border border-white/5 bg-slate-900/30 hover:border-primary/30 transition-all flex gap-3">
            <div className={cn(
              "p-1.5 rounded h-fit",
              log.type === 'alert' ? 'text-red-500 bg-red-500/10' : 'text-primary bg-primary/10'
            )}>
              {log.type === 'alert' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-[10px] font-bold text-slate-300 tracking-wider font-mono">{log.title}</h4>
                <span className="text-[8px] text-primary/40 font-mono">{log.time}</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-0.5 italic leading-tight">{log.msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div className="p-3 border-t border-primary/10 bg-black/60 space-y-2">
        {canLog ? (
          <button 
            onClick={() => logEvent("Sighting logged in Sector Alpha-9")}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-primary border border-primary/30 rounded text-[9px] font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-[0.15em]"
          >
            <Plus className="w-3.5 h-3.5" /> Log Field Event
          </button>
        ) : (
          <div className="py-2 text-center text-[8px] text-slate-600 border border-dashed border-white/5 rounded uppercase tracking-widest">
            Read Only Access
          </div>
        )}
        
        {isOps && (
          <button 
            onClick={() => dispatchUnits("ALL SECTORS")}
            className="w-full py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/40 rounded text-[9px] font-black transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.1)]"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> Dispatch All Units
          </button>
        )}
      </div>
    </div>
  );
}