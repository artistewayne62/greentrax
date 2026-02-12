import { GpsFixed, Map as MapIcon, Layers, Crosshair } from "lucide-react";
import { useAuth } from "../core/auth/AuthContext";
import { useRealtimeActions } from "../core/useRealtimeActions";
import { cn } from "../core/utils";

export function MapWidget() {
  const { role } = useAuth();
  const { dispatchUnits, logEvent } = useRealtimeActions();

  // Simulated sectors for the grid
  const sectors = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

  const handleMapInteraction = (id: string) => {
    if (role === 'ops') {
      dispatchUnits(id);
    } else {
      logEvent(`Sector ${id} highlighted for observation.`);
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* Background Image/Projection */}
      <img 
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000" 
        className="w-full h-full object-cover opacity-30 grayscale saturate-50"
        alt="Tactical Terrain"
      />
      
      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
        {sectors.map(s => (
          <div key={s} className="border-[0.5px] border-primary/40 flex items-start p-2">
            <span className="text-[8px] text-primary/60 font-mono font-bold tracking-widest">{s}</span>
          </div>
        ))}
      </div>

      {/* Interaction Layer */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {sectors.map(s => (
          <button
            key={s}
            onClick={() => handleMapInteraction(s)}
            className="hover:bg-primary/5 transition-colors cursor-crosshair group relative"
          >
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Crosshair className="w-6 h-6 text-primary/40" />
             </div>
          </button>
        ))}
      </div>

      {/* Floating Map HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-black/80 p-2 border border-primary/20 rounded-md backdrop-blur-md">
          <GpsFixed className="w-3.5 h-3.5 text-primary animate-spin-slow" />
          <span className="text-[9px] font-mono text-white/80 uppercase tracking-widest">34.05° N, 118.24° W</span>
        </div>
        
        <div className="flex items-center gap-2 bg-black/80 p-2 border border-primary/20 rounded-md backdrop-blur-md">
          <MapIcon className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] font-mono text-white/80 uppercase tracking-widest">
            {role === 'guest' ? 'SIM_PROJECTION' : 'LIVE_SATELLITE'}
          </span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg-black/80 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all rounded shadow-lg">
          <Layers className="w-4 h-4" />
        </button>
        <button className="p-2 bg-black/80 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all rounded shadow-lg">
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Scanline / Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.05]" />
    </div>
  );
}