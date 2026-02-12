import { Permission } from "../auth/permissions";

export interface MediaAsset {
  path: string;
  requiredPermission: Permission;
  label: string;
  isLive?: boolean;
  isPremium?: boolean;
}

export const SIMULATION_ASSETS = {
  IMAGES: {
    GENERAL: { 
      path: '/images/impalas-lush.jpg', 
      requiredPermission: 'VIEW_SIMULATIONS', 
      label: 'Savannah Overview' 
    },
    SAT_PREMIUM: { 
      path: '/images/sat-high-res.png', 
      requiredPermission: 'VIEW_PPV_MEDIA', 
      label: 'HD Satellite Feed', 
      isPremium: true 
    },
    ANALYST: { 
      path: '/images/leopard-pexels.jpg', 
      requiredPermission: 'VIEW_ANALYST_DATA', 
      label: 'Tactical Tracking' 
    },
    RANGER: { 
      path: '/images/Elephants-silhouette-vecteezy.jpg', 
      requiredPermission: 'VIEW_BODYCAM', 
      label: 'Ranger Field Cam' 
    },
    OPS: { 
      path: '/images/ops-restricted.png', 
      requiredPermission: 'BLACKLIST_AREAS', 
      label: 'Restricted Ops Overlay' 
    }
  },
  VIDEOS: {
    DEMO: { 
      path: '/videos/topi-zebra-savannah.mov', 
      requiredPermission: 'VIEW_SIMULATIONS', 
      label: 'Eco-System Demo' 
    },
    LIVE_DRONE: { 
      path: '/videos/rhinos-warthogs-impala-gnus.mov', 
      requiredPermission: 'VIEW_LIVE_FEED', 
      label: 'Drone Recon Alpha', 
      isLive: true 
    },
    LIVE_HUNT: { 
      path: '/videos/Lions-Wildebeest_hunt.mov', 
      requiredPermission: 'VIEW_BODYCAM', 
      label: 'Predator Bodycam', 
      isLive: true 
    },
    COMMAND: { 
      path: '/videos/lion-Mara-slomo.mov', 
      requiredPermission: 'OPS_OVERRIDE', 
      label: 'Command Briefing' 
    }
  }
} as const;