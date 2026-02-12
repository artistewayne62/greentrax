// src/hooks/useMedia.ts
import { useAuth } from "../context/AuthContext";
import { SIM_MEDIA, SimMediaCategory } from "../assets/sim/media";

export const useMedia = () => {
  const { checkPermission } = useAuth();

  const getAsset = (category: SimMediaCategory, key: string) => {
    const categoryAssets = SIM_MEDIA[category] as any;
    const asset = categoryAssets[key];

    if (!asset) return null;

    // Check if user has the specific permission required for this file
    const hasAccess = checkPermission(asset.requiredPermission);

    return {
      ...asset,
      hasAccess,
      // Provide a blurred placeholder or null if no access
      displayPath: hasAccess ? asset.path : '/images/locked-placeholder.png'
    };
  };

  return { getAsset };
};