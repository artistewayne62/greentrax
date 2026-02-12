import React, { useState } from 'react';
import { useAuth } from '../core/auth/AuthContext';
import { SIMULATION_ASSETS, MediaAsset } from '../core/simulations/media';
import { RoleSwitcher } from './RoleSwitcher';

export const MediaGallery = () => {
  const { roleLabel, checkPermission } = useAuth();
  
  // Set the default view to the general Savannah overview
  const [activeAsset, setActiveAsset] = useState<MediaAsset>(SIMULATION_ASSETS.IMAGES.GENERAL);

  const handleSelect = (asset: MediaAsset) => {
    // Only update if user has permission; otherwise, do nothing (or show alert)
    if (checkPermission(asset.requiredPermission)) {
      setActiveAsset(asset);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Tactical Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-black text-green-500 tracking-tighter">
            GREENTRAX<span className="text-white opacity-20">.SYS</span>
          </h1>
          <div className="hidden lg:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-l border-zinc-700 pl-6">
            UPLINK STATUS: <span className="text-green-400">ENCRYPTED</span> // FEED: {activeAsset.label}
          </div>
        </div>
        <RoleSwitcher />
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Navigation Hub */}
        <aside className="w-80 bg-zinc-950 border-r border-zinc-800 p-4 overflow-y-auto scrollbar-tactical">
          <div className="mb-8">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Static Intelligence</h3>
            <div className="space-y-1">
              {Object.values(SIMULATION_ASSETS.IMAGES).map((asset) => (
                <FeedButton 
                  key={asset.path} 
                  asset={asset} 
                  isActive={activeAsset.path === asset.path} 
                  onSelect={handleSelect} 
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Tactical Streams</h3>
            <div className="space-y-1">
              {Object.values(SIMULATION_ASSETS.VIDEOS).map((asset) => (
                <FeedButton 
                  key={asset.path} 
                  asset={asset} 
                  isActive={activeAsset.path === asset.path} 
                  onSelect={handleSelect} 
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Stage: The Primary Feed */}
        <main className="flex-1 bg-black p-8 relative flex flex-col">
          <div className={`relative flex-1 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl
            ${activeAsset.label.includes('Satellite') ? 'satellite-scanner' : ''}`}>
            
            {/* Viewport Overlay */}
            <div className="absolute top-8 left-8 z-40 bg-black/50 backdrop-blur-md p-5 rounded-xl border border-white/10">
              {/*<p className="text-green-500 text-[10px] font-mono font-bold mb-1">00:0{Math.floor(Math.random()*9)} // AUTH_LVL: {roleLabel.toUpperCase()}</p>*/}
              <p className="text-green-500 text-[10px] font-mono font-bold mb-1">
  00:0{Math.floor(Math.random()*9)} // AUTH_LVL: {(role ?? "guest").toUpperCase()}
</p>

              <h2 className="text-2xl font-black uppercase tracking-tight text-white">{activeAsset.label}</h2>
            </div>

            {/* Media Rendering Logic */}
            <div className="w-full h-full">
              {activeAsset.path.endsWith('.mov') || activeAsset.path.endsWith('.mp4') ? (
                <video 
                  key={activeAsset.path} // Force re-mount on change
                  src={activeAsset.path} 
                  className="w-full h-full object-cover" 
                  autoPlay muted loop 
                />
              ) : (
                <img 
                  src={activeAsset.path} 
                  className="w-full h-full object-cover" 
                  alt="Uplink" 
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* Sub-component for Sidebar Items */
const FeedButton = ({ asset, isActive, onSelect }: { asset: MediaAsset, isActive: boolean, onSelect: (a: MediaAsset) => void }) => {
  const { checkPermission } = useAuth();
  const hasAccess = checkPermission(asset.requiredPermission);

  return (
    <button
      onClick={() => onSelect(asset)}
      className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all border ${
        isActive 
          ? 'bg-green-500/10 border-green-500/50 text-green-400' 
          : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-900'
      } ${!hasAccess && 'opacity-30 grayscale cursor-not-allowed'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${asset.isLive ? 'bg-red-500 animate-pulse' : (isActive ? 'bg-green-500' : 'bg-zinc-700')}`} />
        <span className="text-[11px] font-bold uppercase tracking-tight truncate">{asset.label}</span>
      </div>
      {!hasAccess && <span className="text-[10px]">🔒</span>}
    </button>
  );
};
