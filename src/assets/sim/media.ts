import { Permission } from "../../core/auth/permissions";

export interface MediaAsset {
  path: string;
  requiredPermission: Permission;
  label: string;
  isLive?: boolean;
  isPremium?: boolean;
}

export const SIM_IMAGES: Record<string, MediaAsset> = {
  GENERAL: { path: '/images/general-area.png', requiredPermission: 'VIEW_SIMULATIONS', label: 'General Area Map' },
  SAT_PREMIUM: { path: '/images/sat-high-res.png', requiredPermission: 'VIEW_PPV_MEDIA', label: 'HD Satellite Feed', isPremium: true },
  ANALYST: { path: '/images/analyst-vectors.png', requiredPermission: 'VIEW_ANALYST_DATA', label: 'Tactical Vectors' },
  RANGER: { path: '/images/ranger-feed-static.png', requiredPermission: 'VIEW_BODYCAM', label: 'Ranger Field Cam' },
  OPS: { path: '/images/ops-restricted.png', requiredPermission: 'BLACKLIST_AREAS', label: 'Restricted Ops Overlay' }
};

export const SIM_VIDEOS: Record<string, MediaAsset> = {
  DEMO: { path: '/videos/sim-alpha.mp4', requiredPermission: 'VIEW_SIMULATIONS', label: 'Sim Demo' },
  DRONE: { path: '/videos/drone-recon.mp4', requiredPermission: 'VIEW_LIVE_FEED', label: 'Drone Recon Alpha', isLive: true },
  BODYCAM: { path: '/videos/ranger-live.mp4', requiredPermission: 'VIEW_BODYCAM', label: 'Ranger Bodycam', isLive: true },
  COMMAND: { path: '/videos/ops-brief.mp4', requiredPermission: 'OPS_OVERRIDE', label: 'Command Briefing' }
};