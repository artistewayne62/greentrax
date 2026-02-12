import { AlertTriangle, Clock, MoreHorizontal, Plus, Radio, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../core/auth/AuthContext";
import { toast } from "sonner";

export function ActionHub() {
  const { role, checkPermission } = useAuth();
  
  // Local state replaces Supabase fetching
  const [logs] = useState([
    { id: 1, title: "Ranger 4 Dispatch", loc: "Sector 7", time: "14:02", type: "unit" },
    { id: 2, title: "Perimeter Breach", loc: "North Fence", time: "13:45", type: "alert" },
    { id: 3, title: "Drone Alpha Active", loc: "Grid B-2", time: "12:30", type: "unit" },
  ]);

  // Permission logic based on core/auth requirements
  const canLog = checkPermission('TRANSMIT_RANGER_ANALYST');
  const canDispatch = checkPermission('DEPLOY_UNITS');

  const handleAction = (msg: string) => {
    toast.success("GreenTrax.OS Command Acknowledged", {
      description: msg,
      className: "font-mono text-[10px] uppercase border-primary/50 bg-black text-primary"
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/50 border border-primary/20 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-primary/10 bg-black/40 flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Action Hub</h2>
          <p className="text-[9px] text-slate-500 font-mono italic">Role: {role}</p>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="group p-3 rounded bg-slate-900/40 border border-white/5 hover:border-primary/30 transition-all flex items-start gap-3">
            <div className={`p-1.5 rounded ${log.type === 'alert' ? 'text-red-500 bg-red-500/10' : 'text-primary bg-primary/10'}`}>
              {log.type === 'alert' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            <div className="flex-1">
              <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">{log.title}</h4>
              <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-500 font-mono uppercase">
                <span>{log.loc}</span>
                <span>•</span>
                <span className="text-primary/70">{log.time} UTC</span>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded transition-opacity">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-primary/10 bg-black/60 space-y-2">
        {canLog ? (
          <button 
            onClick={() => handleAction("New field observation logged to local buffer.")}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-primary border border-primary/30 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            <Plus className="w-3 h-3" /> Log Local Event
          </button>
        ) : (
          <div className="w-full py-2 text-center text-[9px] text-slate-600 border border-dashed border-white/10 rounded uppercase tracking-widest">
            Read Only Access
          </div>
        )}
        
        {canDispatch && (
          <button 
            onClick={() => handleAction("Unit deployment signal transmitted to all Rangers.")}
            className="w-full py-2 bg-primary hover:bg-primary/90 text-black rounded text-[10px] font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <ShieldAlert className="w-3 h-3" /> Dispatch All Units
          </button>
        )}
      </div>
    </div>
  );
}