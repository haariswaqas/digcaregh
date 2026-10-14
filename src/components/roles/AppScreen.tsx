import Image from "next/image";

/** Matches the light backdrop baked into the booking screenshots, so frames blend seamlessly. */
export const SCREEN_BACKDROP = "#F4F7FB";

/** Phone exports cropped just below the device, hiding the caption baked into the bottom. */
export const DEFAULT_SCREEN_ASPECT = "940 / 1840";

interface AppScreenProps {
  src: string;
  alt: string;
  sizes: string;
  /** CSS aspect-ratio of the visible crop, e.g. "940 / 1840". */
  aspect?: string;
  priority?: boolean;
  className?: string;
}

export default function AppScreen({ src, alt, sizes, aspect = DEFAULT_SCREEN_ASPECT, priority = false, className = "" }: AppScreenProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
