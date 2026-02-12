import { motion } from "framer-motion";
import { X, Minus, GpsFixed, Maximize2 } from "lucide-react";
import { useState } from "react";

interface FloatingWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialPos?: { x: number; y: number };
}

export function FloatingWindow({ title, onClose, children, initialPos = { x: 100, y: 100 } }: FloatingWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, x: initialPos.x, y: initialPos.y }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed z-[999] w-80 bg-slate-950/90 backdrop-blur-xl border border-primary/40 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden"
    >
      {/* Header / Drag Handle */}
      <div className="bg-primary/10 px-3 py-2 flex justify-between items-center cursor-grab active:cursor-grabbing border-b border-primary/20">
        <div className="flex items-center gap-2">
          <GpsFixed className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">
            {title}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-slate-400 hover:text-white">
            <Minus className="w-3 h-3" />
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <div className="p-0 bg-black/40 min-h-[150px]">
          {children}
          {/* Tactical Coordinate Footer */}
          <div className="p-2 border-t border-white/5 flex justify-between items-center bg-black/60">
            <span className="text-[8px] font-mono text-primary/50">SEC: B-02 // TRK_ACTIVE</span>
            <Maximize2 className="w-3 h-3 text-primary/50 cursor-pointer hover:text-primary" />
          </div>
        </div>
      )}
    </motion.div>
  );
}