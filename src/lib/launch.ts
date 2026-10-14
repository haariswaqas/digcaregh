// Single source of truth for launch timing. Edit dates here; every countdown,
// progress meter and milestone status on the site derives from them.

export const LAUNCH_DATE = new Date("2026-11-27T09:00:00Z");
export const LAUNCH_LABEL = "Late November 2026";
/** For use mid-sentence, e.g. "Launching late November 2026." */
export const LAUNCH_LABEL_INLINE = "late November 2026";
export const PROGRAM_START = new Date("2025-09-01T00:00:00Z");

export interface Milestone {
  title: string;
  description: string;
  /** Target completion date. Status is derived from this vs. the current time. */
  date: Date;
  dateLabel: string;
}

export const MILESTONES: Milestone[] = [
  {
    title: "Platform build",
    description: "Patient, doctor, facility and insurer experiences built on one shared record.",
    date: new Date("2026-08-29T00:00:00Z"),
    dateLabel: "Aug 2026",
  },
  {
    title: "Security & privacy hardening",
    description: "Consent-based access, audit trails, PIN and OTP protection on sensitive actions.",
    date: new Date("2026-09-30T00:00:00Z"),
    dateLabel: "Sep 2026",
  },
  {
    title: "Partner facility onboarding",
    description: "Clinics, pharmacies and labs set up their teams, schedules and services.",
    date: new Date("2026-10-31T00:00:00Z"),
    dateLabel: "Oct 2026",
  },
  {
    title: "Closed beta",
    description: "Early waitlist members book real appointments and help us polish the experience.",
    date: new Date("2026-11-14T00:00:00Z"),
    dateLabel: "Early Nov 2026",
  },
  {
    title: "Public launch",
    description: "DigCare opens to everyone in Ghana on iOS and Android.",
    date: LAUNCH_DATE,
    dateLabel: LAUNCH_LABEL,
  },
];

export type MilestoneStatus = "done" | "active" | "upcoming";

export function milestoneStatuses(now: number): MilestoneStatus[] {
  let activeAssigned = false;
  return MILESTONES.map((m) => {
    if (now >= m.date.getTime()) return "done";
    if (!activeAssigned) {
      activeAssigned = true;
      return "active";
    }
    return "upcoming";
  });
}

export function launchProgress(now: number): number {
  const total = LAUNCH_DATE.getTime() - PROGRAM_START.getTime();
  const elapsed = now - PROGRAM_START.getTime();
  return Math.min(1, Math.max(0, elapsed / total));
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export function timeUntilLaunch(now: number): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: diff === 0,
  };
}
