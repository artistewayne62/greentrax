import { ActionHub } from "../ActionHub";
import { AudioStream } from "../comms/AudioStream";
import { Terminal, Activity, Zap } from "lucide-react";
import { useAuth } from "../../core/auth/AuthContext";
import { cn } from "../../core/utils";

export function Sidepanel() {
  const { role } = useAuth();

  return (
    <aside className="flex flex-col h-full gap-3">
      {/* 1. System Status Mini-Panel */}
      <div className="p-3 bg-slate-950/40 border border-primary/20 rounded-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              System_Status
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-primary/20" />
            <div className="w-1 h-3 bg-primary/40" />
            <div className="w-1 h-3 bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-black/40 border border-white/5 rounded">
            <div className="flex items-center gap-1.5 mb-1">
              <Activity className="w-3 h-3 text-primary/60" />
              <span className="text-[7px] text-slate-500 uppercase">CPU Load</span>
            </div>
            <span className="text-[10px] font-mono text-primary">12.4%</span>
          </div>
          <div className="p-2 bg-black/40 border border-white/5 rounded">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-3 h-3 text-primary/60" />
              <span className="text-[7px] text-slate-500 uppercase">Uplink</span>
            </div>
            <span className={cn(
              "text-[10px] font-mono",
              role === 'guest' ? "text-yellow-500" : "text-primary"
            )}>
              {role === 'guest' ? "NOMINAL" : "ENCRYPTED"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Action Hub (Logs & Operations) */}
      <div className="flex-1 min-h-0">
        <ActionHub />
      </div>

      {/* 3. Communication Stack */}
      <div className="h-fit">
        <AudioStream />
      </div>

      {/* 4. Branding Footer */}
      <div className="px-2 py-1 flex justify-between items-center opacity-30 select-none">
        <span className="text-[7px] font-mono text-primary uppercase tracking-[0.2em]">
          GTX-OS Proprietary
        </span>
        <span className="text-[7px] font-mono text-white">
          © WAYNE FRANCIS, 2026
        </span>
      </div>
    </aside>
  );
}