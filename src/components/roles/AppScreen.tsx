import Image from "next/image";

/** Matches the light backdrop baked into the booking screenshots, so frames blend seamlessly. */
export const SCREEN_BACKDROP = "#F4F7FB";

interface AppScreenProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders a 940×2020 phone screenshot cropped just below the device,
 * hiding the caption baked into the bottom of the export.
 */
export default function AppScreen({ src, alt, sizes, priority = false, className = "" }: AppScreenProps) {
  return (
    <div className={`relative aspect-[940/1840] w-full overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
