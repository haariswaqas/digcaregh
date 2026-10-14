interface CropAvatarProps {
  src: string;
  /** Natural image size in px */
  imgW: number;
  imgH: number;
  /** Centre and radius of the region to show, in natural image px */
  cx: number;
  cy: number;
  r: number;
  size: number;
  className?: string;
  rounded?: string;
}

/** Shows a circular/rounded crop of a larger image without needing a separate asset. */
export default function CropAvatar({ src, imgW, imgH, cx, cy, r, size, className = "", rounded = "9999px" }: CropAvatarProps) {
  const scale = size / (r * 2);
  return (
    <span
      aria-hidden
      className={`block flex-shrink-0 bg-no-repeat ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        backgroundImage: `url("${src}")`,
        backgroundSize: `${imgW * scale}px ${imgH * scale}px`,
        backgroundPosition: `${-(cx * scale - size / 2)}px ${-(cy * scale - size / 2)}px`,
      }}
    />
  );
}

export const DOCTOR_FACE = { src: "/assets/FemaleDoctor.png", imgW: 1400, imgH: 1556, cx: 690, cy: 560, r: 330 };
export const PATIENT_FACE = { src: "/assets/HeroImage.png", imgW: 1720, imgH: 1716, cx: 247, cy: 320, r: 84 };
