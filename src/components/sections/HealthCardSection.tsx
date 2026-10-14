"use client";

import { useMemo, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Eye, Hand, IdCard, QrCode, RotateCcw, ShieldX, X } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";

const BULLETS = [
  { icon: IdCard, color: "#059669", title: "Your digital identity", desc: "A unique health card linked to your complete medical profile." },
  { icon: QrCode, color: "#D97706", title: "Instant QR check-in", desc: "Facilities scan your code to identify you in seconds — no forms." },
  { icon: Hand, color: "#0D9488", title: "You're in control", desc: "Every record access needs your approval. Your data, your rules." },
];

const ACCESS_LOG = [
  { who: "General Clinic · Accra", what: "Requested your full record", status: "approved" as const, when: "2 min ago" },
  { who: "Partner Pharmacy", what: "Viewed active prescriptions", status: "viewed" as const, when: "1 hr ago" },
  { who: "Unrecognised provider", what: "Requested lab results", status: "denied" as const, when: "Yesterday" },
];

const STATUS_STYLE = {
  approved: { label: "Approved", icon: Check, cls: "bg-emerald-100 text-emerald-700" },
  viewed: { label: "Logged", icon: Eye, cls: "bg-sky-100 text-sky-700" },
  denied: { label: "Denied", icon: X, cls: "bg-rose-100 text-rose-700" },
};

const QR_SIZE = 25;

function QrGlyph({ className = "" }: { className?: string }) {
  const cells = useMemo(() => {
    let seed = 20261127;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const inFinder = (x: number, y: number) =>
      (x < 8 && y < 8) || (x >= QR_SIZE - 8 && y < 8) || (x < 8 && y >= QR_SIZE - 8);
    const out: [number, number][] = [];
    for (let y = 0; y < QR_SIZE; y++)
      for (let x = 0; x < QR_SIZE; x++) if (!inFinder(x, y) && rand() > 0.52) out.push([x, y]);
    return out;
  }, []);

  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.4} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} fill="white" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill="currentColor" />
    </g>
  );

  return (
    <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className={className} aria-hidden shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
      {finder(0, 0)}
      {finder(QR_SIZE - 7, 0)}
      {finder(0, QR_SIZE - 7)}
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg width="40" height="30" viewBox="0 0 40 30" aria-hidden>
      <rect x="0.5" y="0.5" width="39" height="29" rx="6" fill="url(#chip-g)" stroke="rgba(0,0,0,0.15)" />
      <path d="M0 10h12M0 20h12M28 10h12M28 20h12M12 0v30M28 0v30M12 15h16" stroke="rgba(120,80,0,0.35)" />
      <defs>
        <linearGradient id="chip-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FCD34D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HealthCard3D() {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 16 });
  const sy = useSpring(py, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, [0, 1], [-14, 14]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const sheenX = useTransform(sx, [0, 1], [0, 100]);
  const sheenY = useTransform(sy, [0, 1], [0, 100]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.2), transparent 40%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="flex flex-col items-center">
      <div onMouseMove={onMove} onMouseLeave={onLeave} className="w-full max-w-[440px] [perspective:1200px]">
        <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d]">
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[1.586] w-full [transform-style:preserve-3d]"
          >
            {/* Front */}
            <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#065F46] via-[#0E7490] to-[#0369A1] p-6 text-white shadow-[0_40px_80px_-24px_rgba(3,105,161,0.55)] [backface-visibility:hidden] sm:p-7">
              <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden>
                <path d="M0 190 C 90 150, 180 230, 270 180 S 380 140, 400 160 V252 H0Z" fill="white" opacity="0.25" />
                <path d="M0 215 C 110 180, 200 250, 300 205 S 390 185, 400 195 V252 H0Z" fill="white" opacity="0.3" />
                <circle cx="350" cy="30" r="90" fill="none" stroke="white" strokeOpacity="0.25" />
                <circle cx="350" cy="30" r="130" fill="none" stroke="white" strokeOpacity="0.15" />
              </svg>
              <motion.div className="pointer-events-none absolute inset-0" style={{ background: sheen }} />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src="/assets/digicare_app_icon.png" alt="" className="h-9 w-9 rounded-xl bg-white p-1" />
                    <div className="font-manrope leading-tight">
                      <p className="text-[14px] font-extrabold tracking-wide">DigCare</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[2px] text-white/70">Health Card</p>
                    </div>
                  </div>
                  <ChipIcon />
                </div>

                <div className="mt-auto">
                  <p className="font-display text-[22px] font-bold tracking-tight sm:text-[24px]">Hamdiyyah Ibrahim</p>
                  <p className="mt-1 font-mono text-[14px] tracking-[3px] text-white/85 sm:text-[15px]">DGC 0012 3456 7890</p>
                  <div className="font-manrope mt-4 flex items-end justify-between text-[10px] uppercase tracking-[1.5px] text-white/60">
                    <div>
                      Card type
                      <p className="text-[13px] font-bold normal-case tracking-normal text-white">Adult</p>
                    </div>
                    <div>
                      Valid thru
                      <p className="text-[13px] font-bold normal-case tracking-normal text-white">11 / 29</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold normal-case tracking-normal text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 flex items-center gap-5 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_40px_80px_-24px_rgba(15,23,42,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:gap-7 sm:p-7">
              <div className="relative aspect-square h-full max-h-[170px] flex-shrink-0 rounded-2xl border border-slate-100 p-2.5">
                <QrGlyph className="h-full w-full text-[#0B1120]" />
                <span className="animate-scan absolute inset-x-1 h-[2px] rounded-full bg-emerald-400 shadow-[0_0_12px_3px_rgba(16,185,129,0.6)]" />
              </div>
              <div className="font-manrope min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[1.8px] text-emerald-600">Scan to check in</p>
                <p className="font-display mt-1.5 text-[18px] font-bold leading-snug text-[#0B1120] sm:text-[20px]">
                  Identity confirmed in seconds.
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
                  A scan identifies you. Viewing your records still needs your approval.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="font-manrope mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13.5px] font-bold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700"
      >
        {flipped ? <RotateCcw size={15} /> : <QrCode size={15} />}
        {flipped ? "Show card front" : "Show QR code"}
      </button>
    </div>
  );
}

function AccessLog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.3)] backdrop-blur"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="font-display text-[15px] font-bold text-[#0B1120]">Access activity</p>
        <span className="font-manrope inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>
      <ul className="divide-y divide-slate-100">
        {ACCESS_LOG.map((e, i) => {
          const s = STATUS_STYLE[e.status];
          return (
            <motion.li
              key={e.who}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-3 px-1 py-3"
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
                  e.status === "denied" ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-600"
                }`}
              >
                {e.status === "denied" ? <ShieldX size={17} /> : <IdCard size={17} />}
              </span>
              <div className="font-manrope min-w-0 flex-1 leading-tight">
                <p className="truncate text-[13.5px] font-bold text-slate-900">{e.who}</p>
                <p className="truncate text-[12px] text-slate-500">
                  {e.what} · {e.when}
                </p>
              </div>
              <span className={`font-manrope inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
                <s.icon size={12} strokeWidth={3} /> {s.label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

const HealthCardSection = () => {
  return (
    <section id="health-card" className="relative overflow-clip bg-[#F0FDF9] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-[-10%] h-[460px] w-[460px] rounded-full bg-amber-200/40 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[0%] h-[420px] w-[420px] rounded-full bg-emerald-200/50 blur-[120px]" />
        <div className="bg-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_left,#000_10%,transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-16 px-6 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-32 lg:pt-8"
        >
          <HealthCard3D />
        </motion.div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Flagship feature"
            title={
              <>
                Introducing the DigCare <span className="text-gradient-brand">Health Card.</span>
              </>
            }
            subtitle="Your secure digital health identity. Providers get what they need, instantly — and you stay in control of every record."
          />

          <div className="mt-10 space-y-6">
            {BULLETS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${b.color}1A`, color: b.color }}
                >
                  <b.icon size={20} />
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-semibold text-[#0B1120]">{b.title}</h3>
                  <p className="font-manrope mt-1 text-[14.5px] leading-[1.65] text-slate-600">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AccessLog />
        </div>
      </div>
    </section>
  );
};

export default HealthCardSection;
