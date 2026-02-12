import { Globe, Crosshair, Radar, Target } from "lucide-react";
import { useAuth } from "../core/auth/AuthContext";
import { cn } from "../core/utils";

export function SatelliteView() {
  const { role, checkPermission } = useAuth();
  const isHighClearance = checkPermission('VIEW_ANALYST_DATA');

  return (
    <div className="relative h-full min-h-[220px] bg-black rounded-xl border border-primary/20 overflow-hidden shadow-2xl group">
      {/* 1. Base Satellite Imagery */}
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" 
        className={cn(
          "w-full h-full object-cover transition-all duration-1000",
          isHighClearance ? "opacity-40 grayscale-0" : "opacity-20 grayscale"
        )}
        alt="Orbital Feed"
      />

      {/* 2. Tactical UI Overlays */}
      <div className="absolute inset-0">
        {/* Scanning Beam (CSS Animation) */}
        {isHighClearance && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent w-1/2 h-full -skew-x-12 animate-scan-horizontal pointer-events-none" />
        )}
        
        {/* Targeting Reticle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Crosshair className="w-24 h-24 text-primary/30 stroke-[0.5]" />
        </div>
      </div>

      {/* 3. Data Overlays */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Radar className="w-3.5 h-3.5 text-primary animate-spin-slow" />
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
              Orbital_Sat_09
            </span>
          </div>
          <span className="text-[8px] text-primary/60 font-mono ml-5">
            {isHighClearance ? "MULTISPECTRAL_ACTIVE" : "VISUAL_ONLY_SIM"}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="px-1.5 py-0.5 bg-primary/10 border border-primary/30 rounded text-[8px] text-primary font-bold">
            ALT: 420KM
          </span>
          <span className="text-[8px] text-white/30 font-mono tracking-tighter uppercase">
            {role === 'guest' ? 'ARCHIVE_DATA' : 'REALTIME_STREAM'}
          </span>
        </div>
      </div>

      {/* 4. Tracking Marker (Analysts only) */}
      {isHighClearance && (
        <div className="absolute bottom-12 right-12 flex flex-col items-center gap-1 group-hover:scale-110 transition-transform">
          <Target className="w-5 h-5 text-red-500 animate-pulse" />
          <div className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded backdrop-blur-sm">
            <span className="text-[8px] font-bold text-red-500 uppercase tracking-tighter">Target_Alpha</span>
          </div>
        </div>
      )}

      {/* 5. Footer Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 border-t border-primary/10 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-500 uppercase">Cloud Coverage</span>
            <span className="text-[9px] text-white font-mono">12%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-500 uppercase">Thermal Sig</span>
            <span className="text-[9px] text-primary font-mono font-bold">NOMINAL</span>
          </div>
        </div>
        <Globe className="w-4 h-4 text-primary/30" />
      </div>
    </div>
  );
}