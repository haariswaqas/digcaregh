import {
  CalendarCheck,
  CreditCard,
  FlaskConical,
  IdCard,
  MessageSquareLock,
  Pill,
  ShieldCheck,
  Stethoscope,
  Video,
} from "lucide-react";

const SERVICES = [
  { icon: Video, label: "Video consultations" },
  { icon: CalendarCheck, label: "Appointment booking" },
  { icon: Pill, label: "Digital prescriptions" },
  { icon: FlaskConical, label: "Lab results" },
  { icon: IdCard, label: "Digital Health Card" },
  { icon: CreditCard, label: "Mobile Money & card payments" },
  { icon: ShieldCheck, label: "Insurance claims" },
  { icon: MessageSquareLock, label: "Secure messaging" },
  { icon: Stethoscope, label: "Specialist referrals" },
];

export default function ServicesMarquee() {
  return (
    <section aria-label="DigCare services" className="relative overflow-hidden border-y border-white/5 bg-[#0B1120] py-5">
      <div className="mask-fade-x">
        <div className="animate-marquee flex w-max" style={{ animationDuration: "45s" }}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10 pr-10">
            {SERVICES.map(({ icon: Icon, label }) => (
              <li key={label} className="font-manrope flex items-center gap-3 whitespace-nowrap text-[14px] font-semibold text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
                  <Icon size={15} />
                </span>
                {label}
                <span className="ml-6 h-1 w-1 rounded-full bg-slate-600" />
              </li>
            ))}
          </ul>
        ))}
        </div>
      </div>
    </section>
  );
}
