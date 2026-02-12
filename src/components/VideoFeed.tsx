import { useState, useEffect } from "react";
import { useAuth } from "../core/auth/AuthContext";
import { SIMULATION_ASSETS } from "../core/simulations/media";

interface VideoFeedProps {
  assetKey: keyof typeof SIMULATION_ASSETS.VIDEOS;
  className?: string;
}

export function VideoFeed({ assetKey, className = "" }: VideoFeedProps) {
  const { checkPermission } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Get the specific video asset based on the key
  const videoAsset = SIMULATION_ASSETS.VIDEOS[assetKey];

  // Safety check for mounting (important in Next.js or Vite SSR environments)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !videoAsset) return null;

  // Check if the current user role has the required permission defined in media.ts
  const hasAccess = checkPermission(videoAsset.requiredPermission);

  return (
    <div className={`relative overflow-hidden rounded-lg bg-black ${className}`}>
      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-3">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {videoAsset.label}
        </span>
        {videoAsset.isLive && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-xs font-black text-red-500 uppercase">Live Feed</span>
          </div>
        )}
      </div>

      {/* Video Logic */}
      <div className="relative aspect-video w-full">
        {!hasAccess ? (
          /* Locked UI State */
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900/90 backdrop-blur-md">
            <div className="mb-2 text-3xl text-gray-500">🔒</div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              Access Restricted
            </p>
            <p className="text-[10px] text-gray-600 uppercase">
              Requires: {videoAsset.requiredPermission.replace(/_/g, " ")}
            </p>
          </div>
        ) : (
          /* Authorized Video Player */
          <video
            src={videoAsset.path}
            autoPlay={videoAsset.isLive}
            muted={videoAsset.isLive}
            controls
            loop
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}