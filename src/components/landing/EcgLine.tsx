interface EcgLineProps {
  beats?: number;
  color?: string;
  trackColor?: string;
  strokeWidth?: number;
  className?: string;
  duration?: number;
}

function heartbeatPath(beats: number, width: number, height: number): string {
  const mid = height / 2;
  const seg = width / beats;
  let d = `M0 ${mid}`;
  for (let i = 0; i < beats; i++) {
    const x = i * seg;
    const u = seg / 100;
    d +=
      ` L${x + 28 * u} ${mid}` +
      ` Q${x + 32 * u} ${mid - height * 0.08} ${x + 36 * u} ${mid}` +
      ` L${x + 42 * u} ${mid}` +
      ` L${x + 45 * u} ${mid + height * 0.1}` +
      ` L${x + 49 * u} ${mid - height * 0.44}` +
      ` L${x + 53 * u} ${mid + height * 0.3}` +
      ` L${x + 56 * u} ${mid}` +
      ` L${x + 66 * u} ${mid}` +
      ` Q${x + 72 * u} ${mid - height * 0.14} ${x + 78 * u} ${mid}` +
      ` L${x + seg} ${mid}`;
  }
  return d;
}

/** Heartbeat trace with a glowing pulse sweeping along it. */
export default function EcgLine({
  beats = 3,
  color = "#10B981",
  trackColor = "rgba(16,185,129,0.18)",
  strokeWidth = 2,
  className = "",
  duration = 2.6,
}: EcgLineProps) {
  const width = 300;
  const height = 60;
  const d = heartbeatPath(beats, width, height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      fill="none"
    >
      <path d={d} stroke={trackColor} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path
        d={d}
        pathLength={1}
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-ecg"
        style={{ animationDuration: `${duration}s`, filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}
