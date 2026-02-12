import { useMedia } from "../../hooks/useMedia";

interface Props {
  category: "IMAGES";
  assetKey: string;
  className?: string;
}

export const ProtectedImage = ({ category, assetKey, className }: Props) => {
  const { getAsset } = useMedia();
  const asset = getAsset(category, assetKey);

  if (!asset) return null;

  return (
    <div className={`relative ${className}`}>
      <img 
        src={asset.displayPath} 
        alt={asset.label}
        className={!asset.hasAccess ? "grayscale blur-sm" : ""}
      />
      {!asset.hasAccess && (
        <span className="absolute inset-0 flex items-center justify-center text-white">
          Requires {asset.requiredPermission}
        </span>
      )}
    </div>
  );
};