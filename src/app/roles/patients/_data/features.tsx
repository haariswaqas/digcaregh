import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  Video,
  MapPin,
  Pill,
  RefreshCw,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  TestTube,
  Microscope,
  FileText,
  CreditCard,
  Wallet,
  Receipt,
  Banknote,
  ShieldCheck,
  Landmark,
  CalendarX2,
  BadgeCheck,
  QrCode,
  Smartphone,
  History,
  Lock,
  Eye,
  UserCheck,
  Fingerprint,
  Timer,
  Hash,
  LockOpen,
  Building2,
  MessageSquare,
  Paperclip,
  BellRing,
  ShieldAlert,
  Bell,
  BellOff,
  Settings2,
  Volume2,
  User,
  UserCog,
  KeyRound,
  Camera,
  Check,
  type LucideIcon,
} from "lucide-react";

export interface FeatureStat {
  label: string;
  value: string;
}

export interface FeatureCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureStep {
  number: number;
  title: string;
  description: string;
}

export interface FeatureNote {
  icon: LucideIcon;
  text: string;
}

export interface FeatureFaq {
  q: string;
  a: string;
}

export interface FeatureScreen {
  src: string;
  alt: string;
}

export interface WalkthroughStep {
  label: string;
  title: string;
  description: string;
  screen: FeatureScreen;
}

export interface FeatureWalkthrough {
  title: string;
  subtitle: string;
  steps: WalkthroughStep[];
  /** "dark" presents the phones on the site navy with an emerald glow. */
  tone?: "light" | "dark";
}

export interface HeroChip {
  icon: LucideIcon;
  title: string;
  detail?: string;
}

export interface DuoSide {
  role: string;
  caption: string;
  screen: FeatureScreen;
}

/** Two phones side by side, for flows where both parties act. */
export interface FeatureDuo {
  eyebrow: string;
  title: string;
  subtitle: string;
  left: DuoSide;
  right: DuoSide;
}

export interface PatientFeature {
  slug: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  accent: string;
  heroHeadline: string;
  heroSubhead: string;
  /** App screenshot for the hero; falls back to the feature icon when absent. */
  heroScreen?: FeatureScreen;
  /** Background colour baked into this feature's screenshots, so frames blend with them. */
  screenBackdrop?: string;
  /** CSS aspect-ratio of this feature's screenshot crops, when they differ from the default export. */
  screenAspect?: string;
  /** Floating callouts beside the hero screen: a light one bottom-left, a dark one top-right. */
  heroChips?: { light: HeroChip; dark: HeroChip };
  duo?: FeatureDuo;
  stats: FeatureStat[];
  capabilities: FeatureCapability[];
  /** Real app screens shown in "How it works"; takes the place of `steps`. */
  walkthrough?: FeatureWalkthrough;
  steps?: FeatureStep[];
  goodToKnow: FeatureNote[];
  faqs: FeatureFaq[];
  related: string[];
}

export const patientFeatures: PatientFeature[] = [
  {
    slug: "appointments",
    title: "Appointments",
    tag: "APPOINTMENTS",
    icon: Calendar,
    accent: "#10B981",
    heroHeadline: "Book care in seconds, not phone calls.",
    heroSubhead:
      "Find a facility, pick a doctor, choose in-person or video, and confirm — six quick steps in one app, with reminders that keep you from missing it.",
    heroScreen: { src: "/assets/booking/step-5-schedule.png", alt: "DigCare booking screen showing available dates and time slots" },
    heroChips: {
      light: { icon: Check, title: "Booking confirmed", detail: "Fri 16 Oct · 10:30 AM" },
      dark: { icon: BellRing, title: "Reminder 24h before" },
    },
    stats: [
      { label: "Avg. time to book", value: "< 60 sec" },
      { label: "Appointment types", value: "In-person & Teleconsult" },
      { label: "Reminder window", value: "24h + 1h before" },
    ],
    capabilities: [
      {
        icon: MapPin,
        title: "Facility & doctor search",
        description:
          "Search by facility, specialty, or doctor name, and filter by distance, availability, or your insurance network.",
      },
      {
        icon: Video,
        title: "In-person or teleconsult",
        description:
          "Choose a physical visit or a secure video consultation — join the call directly from the app when it's time.",
      },
      {
        icon: CalendarClock,
        title: "Live availability",
        description:
          "See real open slots as doctors update their schedules, instead of guessing and waiting for a callback.",
      },
      {
        icon: RefreshCw,
        title: "Reschedule & cancel",
        description:
          "Move or cancel a booking yourself, within the facility's policy window, without calling the front desk.",
      },
      {
        icon: CalendarCheck,
        title: "Confirmations & reminders",
        description:
          "Get an instant booking confirmation, then push reminders 24 hours and 1 hour before your visit.",
      },
      {
        icon: Clock3,
        title: "Visit history",
        description:
          "Every past appointment — attended, missed, or cancelled — stays on your timeline for future reference.",
      },
    ],
    walkthrough: {
      title: "Book an appointment in six simple steps.",
      subtitle:
        "This is the real booking flow in the DigCare app — from choosing how you want to be seen to confirming your visit.",
      steps: [
        {
          label: "Care type",
          title: "Choose how you want to be seen.",
          description:
            "Pick an in-person visit at a clinic, or a telehealth video consultation from wherever you are.",
          screen: { src: "/assets/booking/step-1-care-type.png", alt: "Select appointment type: in-person visit or telehealth" },
        },
        {
          label: "Preference",
          title: "Start with a doctor or a clinic.",
          description:
            "Already have a doctor you trust? Start with them. Prefer a clinic close to home? Start there instead.",
          screen: { src: "/assets/booking/step-2-preference.png", alt: "Choose to pick a doctor first or select a clinic first" },
        },
        {
          label: "Provider",
          title: "Find the right provider.",
          description:
            "Search by name or specialty. Fees, consultation types and clinic locations are shown up front — no surprises.",
          screen: { src: "/assets/booking/step-3-provider.png", alt: "List of doctors with specialty, fee, video and clinic options" },
        },
        {
          label: "Clinic",
          title: "See where your insurance is accepted.",
          description:
            "Each clinic shows which insurers it accepts, including NHIS, so you know what's covered before you go.",
          screen: { src: "/assets/booking/step-4-clinic.png", alt: "Clinics for the chosen doctor, marked with accepted insurance" },
        },
        {
          label: "Schedule",
          title: "Pick a real open slot.",
          description:
            "Only the days your doctor is actually at the clinic can be booked, with live time slots to choose from.",
          screen: { src: "/assets/booking/step-5-schedule.png", alt: "Available dates and time slots for the appointment" },
        },
        {
          label: "Details",
          title: "Tell your doctor why you're coming.",
          description:
            "Add a short reason so your doctor arrives prepared, check the summary, then confirm in one tap.",
          screen: { src: "/assets/booking/step-6-details.png", alt: "Booking summary with consultation reason and confirm button" },
        },
      ],
    },
    goodToKnow: [
      {
        icon: AlertTriangle,
        text: "Cancellation windows are set by each facility — cancelling too close to the visit may still count as a missed appointment.",
      },
      {
        icon: CheckCircle2,
        text: "Teleconsults use the same encrypted video session for every provider on DigCare — no third-party app required.",
      },
      {
        icon: CalendarX2,
        text: "No-shows are tracked on your profile only for your own reference — they are never shared with other facilities.",
      },
    ],
    faqs: [
      {
        q: "Can I book for a family member?",
        a: "Yes — if you manage a dependent profile (such as a child), you can book, reschedule, and attend teleconsults on their behalf from your own account.",
      },
      {
        q: "What happens if my doctor is running late?",
        a: "You'll get an in-app notification with the updated estimated time as soon as the facility updates the queue, so you're not left guessing in a waiting room.",
      },
      {
        q: "Can I switch a booked in-person visit to a teleconsult?",
        a: "Yes, as long as the doctor supports video consultations and the change is made outside the facility's cut-off window — just open the appointment and tap Change Type.",
      },
    ],
    related: ["messaging", "prescriptions", "notifications"],
  },

  {
    slug: "prescriptions",
    title: "Prescriptions",
    tag: "PRESCRIPTIONS",
    icon: Pill,
    accent: "#10B981",
    heroHeadline: "Every prescription, tracked from pen to pickup.",
    heroSubhead:
      "See exactly what's been prescribed, compare nearby pharmacies on stock and price, and send your prescription ahead — so you never lose track of a medication again.",
    heroScreen: {
      src: "/assets/prescriptions/step-2-prescription-details.png",
      alt: "DigCare prescription details showing the prescribing doctor, clinical notes and medication dosage",
    },
    screenBackdrop: "#F7F8FA",
    heroChips: {
      light: { icon: Check, title: "Sent to pharmacy", detail: "Osu Community Pharmacy" },
      dark: { icon: Wallet, title: "NHIS · 70% covered" },
    },
    stats: [
      { label: "Status tracking", value: "Issued → Completed" },
      { label: "Before you go", value: "Stock & price shown" },
      { label: "Insurance", value: "Applied at the pharmacy" },
    ],
    capabilities: [
      {
        icon: FileText,
        title: "Full prescription detail",
        description:
          "Dosage, frequency, duration, and the prescribing doctor are all attached to every medication — no handwriting to decode.",
      },
      {
        icon: CheckCircle2,
        title: "Status at a glance",
        description:
          "Each prescription is marked Issued, Completed or Cancelled, so you always know what's still waiting to be collected.",
      },
      {
        icon: Wallet,
        title: "Compare pharmacies before you go",
        description:
          "See which nearby pharmacies have every medication in stock, the price per unit, and how much your insurance covers.",
      },
      {
        icon: History,
        title: "Complete medication history",
        description:
          "Every prescription ever issued to you stays on record, useful for new doctors or specialists who need your history.",
      },
      {
        icon: RefreshCw,
        title: "Refill requests",
        description:
          "Request a refill directly from an existing prescription — it's routed to the prescribing doctor for review.",
      },
      {
        icon: ShieldAlert,
        title: "Allergy & interaction flags",
        description:
          "Prescriptions are checked against any allergies on your profile, and flagged for your doctor before they're issued.",
      },
    ],
    walkthrough: {
      title: "From your doctor's note to the pharmacy counter.",
      subtitle:
        "This is the real prescription flow in the DigCare app — from seeing what was prescribed to sending it to the pharmacy of your choice.",
      steps: [
        {
          label: "My prescriptions",
          title: "Every prescription in one place.",
          description:
            "See who prescribed it, what for, and where it stands — Issued, Completed or Cancelled. Filter and search when the list grows.",
          screen: {
            src: "/assets/prescriptions/step-1-my-prescriptions.png",
            alt: "List of prescriptions with doctor, diagnosis, medications and status",
          },
        },
        {
          label: "Details",
          title: "No handwriting to decode.",
          description:
            "Dosage, frequency, duration and how to take each medication, plus your doctor's clinical notes and general instructions.",
          screen: {
            src: "/assets/prescriptions/step-2-prescription-details.png",
            alt: "Prescription details with medications, dosage, frequency and instructions",
          },
        },
        {
          label: "Pharmacies",
          title: "Compare stock and prices before you go.",
          description:
            "See which nearby pharmacies have your medication, the price per unit, and what you'll pay after your insurance is applied.",
          screen: {
            src: "/assets/prescriptions/step-3-nearby-pharmacies.png",
            alt: "Nearby pharmacies with stock levels, unit prices and an insurance-adjusted cost summary",
          },
        },
        {
          label: "Pickup",
          title: "Send it to the pharmacy and you're set.",
          description:
            "Your prescription is sent ahead so it's ready when you arrive. Call or get directions straight from the app.",
          screen: {
            src: "/assets/prescriptions/step-4-selected-pharmacy.png",
            alt: "Selected pharmacy confirmation with call and directions buttons",
          },
        },
      ],
    },
    goodToKnow: [
      {
        icon: ShieldAlert,
        text: "Controlled medications may require an additional PIN or OTP confirmation at the pharmacy for your protection.",
      },
      {
        icon: Wallet,
        text: "The cost shown in the app is an estimate based on current stock and your insurance cover — the pharmacy confirms the final amount when you collect.",
      },
      {
        icon: CheckCircle2,
        text: "Refill requests still require clinical review — they are not auto-approved, even for repeat medications.",
      },
    ],
    faqs: [
      {
        q: "Can I pick up a prescription at any pharmacy?",
        a: "Only at pharmacies that are part of the DigCare network. The app shows nearby partner pharmacies that have your medication in stock, so you can choose before you go.",
      },
      {
        q: "Do I need to send the prescription to a pharmacy before collecting?",
        a: "It's the fastest option — the pharmacy prepares it ahead of time. If you'd rather walk in, a pharmacist can still look up your prescription with your Health Card.",
      },
      {
        q: "Will my doctor see if I never collected a medication?",
        a: "Yes — pending prescriptions remain visible to the prescribing doctor, which helps them follow up on your care.",
      },
    ],
    related: ["appointments", "health-card", "messaging"],
  },

  {
    slug: "lab-orders",
    title: "Lab Orders",
    tag: "LAB ORDERS",
    icon: FlaskConical,
    accent: "#10B981",
    heroHeadline: "Know exactly where your test stands.",
    heroSubhead:
      "From the moment a doctor orders a test to the moment results land, you can see the status without calling the lab to ask.",
    stats: [
      { label: "Status stages", value: "Ordered → In Progress → Ready" },
      { label: "Result access", value: "Directly in-app" },
      { label: "Notification", value: "The moment results are ready" },
    ],
    capabilities: [
      {
        icon: TestTube,
        title: "Order visibility",
        description:
          "See which test was ordered, by which doctor, and why — all in one place as soon as it's logged.",
      },
      {
        icon: Clock3,
        title: "Live status tracking",
        description:
          "Track progress through Ordered, Sample Collected, In Progress, and Results Available stages.",
      },
      {
        icon: Microscope,
        title: "Results, securely delivered",
        description:
          "View structured lab results in the app the moment they're released — no walk-in required to collect a printout.",
      },
      {
        icon: History,
        title: "Historical comparisons",
        description:
          "Past results stay attached to your profile, making it easy for you and your doctor to track trends over time.",
      },
      {
        icon: FileText,
        title: "Shareable reports",
        description:
          "Export or share a result with another provider through the same consent-based access controls as the rest of your record.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Doctor orders a test",
        description:
          "Your doctor logs the lab order during or after your appointment, specifying the test required.",
      },
      {
        number: 2,
        title: "Visit the lab for collection",
        description:
          "Walk in with your Health Card QR — the order is already on file, so there's nothing to fill in by hand.",
      },
      {
        number: 3,
        title: "Track processing in real time",
        description:
          "Status updates as the sample moves through the lab, so you know roughly when to expect results.",
      },
      {
        number: 4,
        title: "View results the moment they're ready",
        description:
          "You and your doctor are notified together — no race to the lab to pick up a report.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldAlert,
        text: "Sensitive results (such as certain diagnostic panels) may be released to your doctor first for a short review window before appearing in your app.",
      },
      {
        icon: CheckCircle2,
        text: "You can request a copy of any historical result be shared with a new specialist without re-ordering the test.",
      },
    ],
    faqs: [
      {
        q: "Can I order a lab test myself without a doctor?",
        a: "No — lab orders must be issued by a licensed doctor so results are interpreted correctly and tied to clinical context.",
      },
      {
        q: "How will I know when results are in?",
        a: "You'll get a push notification the moment the status changes to Results Available — it also shows up under Notifications.",
      },
      {
        q: "Can other doctors see my lab history?",
        a: "Only doctors you've approved through Access Control can view it, regardless of which facility the test was run at.",
      },
    ],
    related: ["appointments", "access-control", "messaging"],
  },

  {
    slug: "billing",
    title: "Billing & Payments",
    tag: "BILLING & PAYMENTS",
    icon: CreditCard,
    accent: "#10B981",
    heroHeadline: "Clear bills. Fast payments. No surprises.",
    heroSubhead:
      "Every charge is itemised and explained — pay instantly with Mobile Money, card, or bank transfer through Paystack, right from the bill itself.",
    stats: [
      { label: "Payment methods", value: "Mobile Money, Card, Bank" },
      { label: "Processor", value: "Paystack" },
      { label: "Itemisation", value: "Line-by-line" },
    ],
    capabilities: [
      {
        icon: Receipt,
        title: "Itemised bills",
        description:
          "Every consultation, test, procedure, and medication is listed as its own line — no vague lump-sum totals.",
      },
      {
        icon: Wallet,
        title: "Mobile Money payments",
        description:
          "Pay directly from MTN MoMo, Telecel Cash, or AirtelTigo Money without leaving the app.",
      },
      {
        icon: Banknote,
        title: "Card & bank transfer",
        description:
          "Prefer a card or direct transfer? Both are supported through the same secure Paystack checkout.",
      },
      {
        icon: ShieldCheck,
        title: "Insurance-adjusted totals",
        description:
          "If you have linked insurance, your bill reflects what's covered and what you owe out-of-pocket, automatically.",
      },
      {
        icon: History,
        title: "Payment history & receipts",
        description:
          "Every past payment is stored with a digital receipt you can revisit or download at any time.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Facility generates a bill",
        description:
          "After your visit, test, or procedure, the facility posts an itemised bill directly to your account.",
      },
      {
        number: 2,
        title: "Review the breakdown",
        description:
          "Check each line item, and see how much insurance covers if a plan is linked to your profile.",
      },
      {
        number: 3,
        title: "Choose a payment method",
        description:
          "Pay the balance with Mobile Money, card, or bank transfer — handled securely through Paystack.",
      },
      {
        number: 4,
        title: "Get an instant digital receipt",
        description:
          "Your bill status updates to Paid immediately, with a receipt saved to your payment history.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldCheck,
        text: "DigCare never stores your full card or Mobile Money PIN — all payment credentials are handled directly by Paystack.",
      },
      {
        icon: AlertTriangle,
        text: "Disputed charges can be flagged from the bill itself, pausing collection while the facility reviews it.",
      },
    ],
    faqs: [
      {
        q: "Can I pay a bill partially?",
        a: "Some facilities allow partial or instalment payments on larger bills — if enabled, you'll see a 'Pay partial amount' option on the bill screen.",
      },
      {
        q: "What if my insurance should have covered more than it did?",
        a: "You can flag the bill for review, which notifies both the facility's billing team and your linked insurance provider.",
      },
      {
        q: "Is it safe to save my card for future bills?",
        a: "Yes — saved cards are tokenised by Paystack, meaning DigCare and the facility never see or store your actual card number.",
      },
    ],
    related: ["insurance", "health-card", "notifications"],
  },

  {
    slug: "insurance",
    title: "Insurance",
    tag: "INSURANCE",
    icon: ShieldCheck,
    accent: "#10B981",
    heroHeadline: "Your coverage, always visible.",
    heroSubhead:
      "Link your insurance plan once and see your coverage, real-time status, and exactly how many days remain before it expires — no calling your provider to check.",
    stats: [
      { label: "Status checks", value: "Real-time" },
      { label: "Expiry visibility", value: "Days remaining, always on" },
      { label: "Linked at billing", value: "Automatic adjustment" },
    ],
    capabilities: [
      {
        icon: Landmark,
        title: "Plan linking",
        description:
          "Connect your insurance provider and policy number once — it stays attached to your profile across every facility.",
      },
      {
        icon: ShieldCheck,
        title: "Coverage breakdown",
        description:
          "See exactly what your plan covers — consultations, medications, labs, procedures — before you're billed.",
      },
      {
        icon: CheckCircle2,
        title: "Real-time status",
        description:
          "Active, pending renewal, or expired — your plan's status is checked live against your provider, not a cached snapshot.",
      },
      {
        icon: Clock3,
        title: "Expiry countdown",
        description:
          "A running day-count to expiry means you're never caught off guard mid-treatment by a lapsed policy.",
      },
      {
        icon: Receipt,
        title: "Automatic bill adjustment",
        description:
          "Covered amounts are calculated against your plan automatically on every bill, showing only what you owe.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Add your insurance provider",
        description:
          "Select your provider from DigCare's partner list and enter your policy details.",
      },
      {
        number: 2,
        title: "Verification with your provider",
        description:
          "DigCare confirms your plan status and coverage directly with the insurance provider's system.",
      },
      {
        number: 3,
        title: "Coverage appears on your profile",
        description:
          "Your plan, coverage categories, and expiry date now show on your Insurance tab.",
      },
      {
        number: 4,
        title: "Bills adjust automatically",
        description:
          "From this point on, every bill reflects your coverage before you're asked to pay.",
      },
    ],
    goodToKnow: [
      {
        icon: AlertTriangle,
        text: "Some plans require pre-authorisation for specific procedures — DigCare will flag this on the relevant bill before you're billed.",
      },
      {
        icon: CheckCircle2,
        text: "You can link more than one plan (e.g. a personal and an employer plan) and choose which one applies per bill.",
      },
    ],
    faqs: [
      {
        q: "What happens when my plan expires?",
        a: "You'll get a notification well before the expiry date, and bills after expiry will show as fully out-of-pocket until you renew or relink.",
      },
      {
        q: "Can a facility see my insurance details without my consent?",
        a: "Only the facility you're actively billed at can see your coverage for that bill — it's not broadcast to every provider on DigCare.",
      },
      {
        q: "What if my provider isn't listed?",
        a: "You can still submit manual claims information to the facility, though real-time status checks are only available for partnered providers.",
      },
    ],
    related: ["billing", "health-card", "access-control"],
  },

  {
    slug: "health-card",
    title: "Health Card",
    tag: "HEALTH CARD",
    icon: BadgeCheck,
    accent: "#10B981",
    heroHeadline: "Your health identity, on your phone.",
    heroSubhead:
      "A Smart Health Card with its own number and QR code, under the Smart Card tab. Doctors scan it at a visit — and nothing is shared until you enter your PIN.",
    heroScreen: {
      src: "/assets/healthcard/frames/01-my-health-card.png",
      alt: "Health Card screen showing Adwoa Asamoah's Smart Health Card, number SMART-K7QH-3VPA, active, expiring March 5, 2027, with a QR code below",
    },
    screenBackdrop: "#040415",
    screenAspect: "920 / 1860",
    heroChips: {
      light: { icon: Check, title: "PIN verified", detail: "Scan approved · 09:32 AM" },
      dark: { icon: QrCode, title: "SMART-K7QH-3VPA" },
    },
    stats: [
      { label: "Card number", value: "SMART-XXXX-XXXX" },
      { label: "Card PIN", value: "6–8 digits" },
      { label: "Every scan", value: "Logged with time & IP" },
    ],
    capabilities: [
      {
        icon: CreditCard,
        title: "One card, one number",
        description:
          "Your Smart Health Card shows your name, card number, status and expiry — with your QR code on a white tile right below it.",
      },
      {
        icon: QrCode,
        title: "Doctors scan your QR",
        description:
          "At a visit, the doctor scans the code with the DigCare app. You get a notification on your own phone straight away.",
      },
      {
        icon: Lock,
        title: "Your PIN is the approval",
        description:
          "Nothing is shared until you enter your 6–8 digit card PIN. Tap Deny Access instead, and the session ends.",
      },
      {
        icon: History,
        title: "Every scan, logged",
        description:
          "Scan History lists each scan — successful or failed — with the time, the scanning device's IP address, and the reason a scan failed.",
      },
      {
        icon: Calendar,
        title: "Expiry at a glance",
        description:
          "See your card type (Smart, NHIS or Hybrid), its status, and how many days remain before it expires.",
      },
      {
        icon: Building2,
        title: "Facility cards too",
        description:
          "A clinic's front desk can issue you a clinic-specific card with its own number and QR. Yours are listed under Facility Cards.",
      },
    ],
    walkthrough: {
      title: "From your card to the doctor's screen.",
      subtitle:
        "This is the real in-person flow in the DigCare app — what you see on your phone, and what the doctor sees on theirs.",
      tone: "dark",
      steps: [
        {
          label: "Your card",
          title: "Your health identity, on your phone.",
          description:
            "One card number and QR code, ready at any visit. Open the Smart Card tab and show the QR to your doctor.",
          screen: {
            src: "/assets/healthcard/frames/01-my-health-card.png",
            alt: "Health Card screen with the Smart Health Card and QR code",
          },
        },
        {
          label: "The scan",
          title: "The doctor scans, then waits.",
          description:
            "The doctor's app reads your QR and starts a scan session. Nothing is shared yet — their screen waits for you.",
          screen: {
            src: "/assets/healthcard/frames/07-doctor-scan-waiting.png",
            alt: "Doctor's Scan Health Card screen showing 'Waiting for patient to enter PIN'",
          },
        },
        {
          label: "Your PIN",
          title: "Nothing opens without your PIN.",
          description:
            "A notification brings you to this screen. Enter your card PIN to approve the scan — or tap Deny Access to end it.",
          screen: {
            src: "/assets/healthcard/frames/02-verify-identity-pin.png",
            alt: "Verify Identity screen asking the patient to enter their PIN, with Verify PIN and Deny Access buttons",
          },
        },
        {
          label: "The log",
          title: "Every scan of your card, logged.",
          description:
            "Successful or not, each scan is recorded with the time and the device's IP address — including failed PIN attempts.",
          screen: {
            src: "/assets/healthcard/frames/06-scan-history.png",
            alt: "Scan History screen listing successful and failed scans with times and IP addresses",
          },
        },
      ],
    },
    duo: {
      eyebrow: "Two phones, one handshake",
      title: "The doctor scans. You approve.",
      subtitle:
        "A scan session only opens once the PIN is entered on your phone. Until then, the doctor's screen simply waits.",
      left: {
        role: "Doctor's phone",
        caption: "Waiting for patient to enter PIN…",
        screen: {
          src: "/assets/healthcard/frames/07-doctor-scan-waiting.png",
          alt: "Doctor's scanner screen waiting for the patient's PIN",
        },
      },
      right: {
        role: "Your phone",
        caption: "Enter your PIN to approve — or deny.",
        screen: {
          src: "/assets/healthcard/frames/02-verify-identity-pin.png",
          alt: "Patient's Verify Identity screen with the PIN field",
        },
      },
    },
    goodToKnow: [
      {
        icon: Lock,
        text: "Once you enter your PIN, the doctor can see your profile, allergies, conditions, emergency contacts, appointments, prescriptions, lab results and insurance for that session.",
      },
      {
        icon: AlertTriangle,
        text: "Facility cards work differently: scanning a clinic-issued facility card opens a session without asking for your PIN.",
      },
      {
        icon: Smartphone,
        text: "Your QR code is loaded from DigCare's servers each time you open the card, so you'll need a connection to show it.",
      },
      {
        icon: KeyRound,
        text: "Your card PIN is 6–8 digits and is asked for every time your card is scanned. Change it any time under Manage Card PIN.",
      },
    ],
    faqs: [
      {
        q: "What if I haven't set a PIN yet?",
        a: "Your Health Card screen shows a 'Secure Your Health Card' alert until you do. Tap Set PIN Now and choose 6–8 digits — from then on it's required for every scan.",
      },
      {
        q: "Does the PIN screen tell me who is scanning?",
        a: "No. The Verify Identity screen asks for your PIN without naming the doctor or facility. If you're not expecting a scan, tap Deny Access.",
      },
      {
        q: "What does Scan History show?",
        a: "Each scan's result (successful or failed), the date and time, the IP address of the device that scanned, and — for failed scans — the reason, such as an incorrect PIN. It doesn't show the doctor's name.",
      },
      {
        q: "What if I lose my phone?",
        a: "Your Health Card is tied to your account, not your device — sign in on a new phone and it's there. Your PIN still protects every scan.",
      },
      {
        q: "What's a facility card?",
        a: "A clinic-specific card a clinic's front desk can issue to you, with its own number and QR code. Doctors at that clinic can scan it to open a session without a PIN step. Yours are listed under Facility Cards in the app.",
      },
    ],
    related: ["access-control", "appointments", "profile"],
  },

  {
    slug: "access-control",
    title: "Access Control",
    tag: "ACCESS CONTROL",
    icon: Fingerprint,
    accent: "#10B981",
    heroHeadline: "Remote requests come to you first.",
    heroSubhead:
      "Doctors can ask to see your records without a visit. You see who's asking, why and for how long — then approve or deny with your PIN, and revoke whenever you like.",
    heroScreen: {
      src: "/assets/healthcard/frames/03-access-request-patient.png",
      alt: "Access Request screen showing a pending request from Dr. Kwame Mensah, Internal Medicine, for 2 days, with Approve Access and Deny Request buttons",
    },
    screenBackdrop: "#040415",
    screenAspect: "920 / 1860",
    heroChips: {
      light: { icon: Check, title: "Access granted", detail: "Dr. Kwame Mensah · 2 days" },
      dark: { icon: KeyRound, title: "One-time code required" },
    },
    stats: [
      { label: "Access window", value: "1 hour to 7 days" },
      { label: "To approve", value: "Your PIN + a one-time code" },
      { label: "To revoke", value: "One tap, any time" },
    ],
    capabilities: [
      {
        icon: UserCheck,
        title: "See who's asking, and why",
        description:
          "Each request shows the doctor's name, specialty and licence number, the reason they gave, and how long they're asking for.",
      },
      {
        icon: Timer,
        title: "A set time, never open-ended",
        description:
          "Doctors ask for between 1 and 168 hours — up to 7 days. There's no indefinite access.",
      },
      {
        icon: KeyRound,
        title: "PIN to approve, PIN to deny",
        description:
          "Every response needs your card PIN, whether you're approving the request or turning it down.",
      },
      {
        icon: Hash,
        title: "A one-time code finishes it",
        description:
          "Approval alone isn't access. You're shown a one-time code (OTP) to share with the doctor, and they must enter it before anything opens.",
      },
      {
        icon: LockOpen,
        title: "Revoke in one tap",
        description:
          "Active access shows the time left. Tap Revoke Access and the doctor's view ends immediately — no PIN needed.",
      },
      {
        icon: Eye,
        title: "See how often they looked",
        description:
          "While access is active, the request shows how many times and when the doctor last viewed your records.",
      },
    ],
    walkthrough: {
      title: "A remote request, from first ask to revoke.",
      subtitle: "The real remote-access flow in the DigCare app, shown on both phones.",
      tone: "dark",
      steps: [
        {
          label: "Request",
          title: "Remote requests come to you first.",
          description:
            "A doctor sends a request with a reason and a time limit. You see who's asking, why and for how long — then approve or deny with your PIN.",
          screen: {
            src: "/assets/healthcard/frames/03-access-request-patient.png",
            alt: "Pending access request from Dr. Kwame Mensah with Approve Access and Deny Request buttons",
          },
        },
        {
          label: "One-time code",
          title: "The doctor still needs your one-time code.",
          description:
            "Approval alone isn't access. You're shown a one-time code to share with the doctor, and they must enter it to finish the handshake.",
          screen: {
            src: "/assets/healthcard/frames/04-otp-required-doctor.png",
            alt: "Doctor's Access Request screen marked 'Approved - Awaiting OTP' with a Verify OTP button",
          },
        },
        {
          label: "What they see",
          title: "What the doctor sees, once you approve.",
          description:
            "Card details, profile, allergies and conditions — plus appointments, prescriptions and lab results — for the approved time only.",
          screen: {
            src: "/assets/healthcard/frames/08-doctor-patient-health-data.png",
            alt: "Doctor's Patient Health Data screen with 'Remote Access Granted', card information and patient profile",
          },
        },
        {
          label: "Revoke",
          title: "Revoke whenever you like.",
          description:
            "Granted access shows the time left. One tap on Revoke Access ends it early — no PIN needed.",
          screen: {
            src: "/assets/healthcard/frames/05-active-access-revoke.png",
            alt: "Access Request screen marked 'Access Granted' showing 31.5 hours left and an Active Access notice",
          },
        },
      ],
    },
    duo: {
      eyebrow: "Two phones, one handshake",
      title: "You approve. They still need the code.",
      subtitle:
        "Your approval generates a one-time code. Until the doctor enters it on their phone, nothing is shared.",
      left: {
        role: "Your phone",
        caption: "Approve or deny — with your PIN.",
        screen: {
          src: "/assets/healthcard/frames/03-access-request-patient.png",
          alt: "Patient's pending access request with Approve and Deny buttons",
        },
      },
      right: {
        role: "Doctor's phone",
        caption: "OTP required — until then, no access.",
        screen: {
          src: "/assets/healthcard/frames/04-otp-required-doctor.png",
          alt: "Doctor's screen asking for the OTP",
        },
      },
    },
    goodToKnow: [
      {
        icon: Timer,
        text: "The doctor chooses the duration (1–168 hours). You can approve or deny it, but not change it.",
      },
      {
        icon: KeyRound,
        text: "The one-time code is shown to you once, when you approve. Share it with the doctor directly.",
      },
      {
        icon: Clock3,
        text: "Time left is shown as a figure — for example '31.5 hours' — and refreshes when you reopen the request. It isn't a live countdown.",
      },
      {
        icon: ShieldCheck,
        text: "Your records are handled under Ghana's Data Protection Act, 2012 (Act 843).",
      },
    ],
    faqs: [
      {
        q: "Can a doctor see my records just because they have my card number?",
        a: "No. A request only becomes access after you approve it with your PIN and the doctor enters the one-time code you share with them.",
      },
      {
        q: "Can I choose which records a doctor sees?",
        a: "Not at the moment. Access is all-or-nothing for the approved time: profile, allergies, conditions, emergency contacts, appointments, prescriptions, lab results and insurance.",
      },
      {
        q: "What happens if I deny a request?",
        a: "You enter your PIN to confirm, and the doctor is told the request was denied. Nothing is shared.",
      },
      {
        q: "What happens when the time runs out?",
        a: "Access ends on its own at the end of the approved window, and the request stays in your list marked Expired.",
      },
      {
        q: "Does revoking need my PIN?",
        a: "No. Approving and denying need your PIN; revoking is a confirmation tap, and it takes effect immediately.",
      },
    ],
    related: ["health-card", "lab-orders", "profile"],
  },

  {
    slug: "messaging",
    title: "In-App Messaging",
    tag: "IN-APP MESSAGING",
    icon: MessageSquare,
    accent: "#10B981",
    heroHeadline: "Talk to your doctor without a waiting room.",
    heroSubhead:
      "Secure, private conversations with the providers treating you — ask a follow-up question, request a refill, or get test results explained, without booking a full visit.",
    stats: [
      { label: "Encryption", value: "End-to-end" },
      { label: "Who can message you", value: "Your care team only" },
      { label: "Attachments", value: "Photos & documents" },
    ],
    capabilities: [
      {
        icon: MessageSquare,
        title: "Direct provider threads",
        description:
          "Every doctor you've had an appointment with gets a dedicated, persistent conversation thread.",
      },
      {
        icon: Paperclip,
        title: "Share photos & documents",
        description:
          "Send a photo of a symptom or a document from another provider directly within the conversation.",
      },
      {
        icon: RefreshCw,
        title: "Request refills in-chat",
        description:
          "Ask for a prescription refill directly in the thread — it links straight to your Prescriptions record for the doctor to action.",
      },
      {
        icon: BellRing,
        title: "Read receipts & typing status",
        description:
          "Know when your doctor has seen your message, so you're not left wondering if it got through.",
      },
      {
        icon: History,
        title: "Kept as part of your record",
        description:
          "Conversations are retained alongside your medical record, accessible later if relevant to your care.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Start from an appointment",
        description:
          "A conversation thread opens automatically with any doctor you've booked an appointment with.",
      },
      {
        number: 2,
        title: "Send your message",
        description:
          "Ask a question, describe a symptom, or attach a photo — just like any modern chat app.",
      },
      {
        number: 3,
        title: "Get a response from your provider",
        description:
          "Your doctor replies when available, factoring your message into any ongoing or future care.",
      },
      {
        number: 4,
        title: "Keep the thread for later",
        description:
          "The full conversation stays in your history, useful context for follow-up visits.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldCheck,
        text: "Messaging is end-to-end encrypted and only visible to you and the specific provider in the thread.",
      },
      {
        icon: AlertTriangle,
        text: "In-app messaging isn't monitored for emergencies — for anything urgent, book an appointment or seek in-person care immediately.",
      },
    ],
    faqs: [
      {
        q: "Can any doctor on DigCare message me?",
        a: "No — only providers you've had an appointment with, or who you've explicitly approved through Access Control, can start a thread with you.",
      },
      {
        q: "How fast will I get a reply?",
        a: "Response times vary by provider and aren't guaranteed instant — messaging is meant for non-urgent follow-ups, not emergency care.",
      },
      {
        q: "Are my messages used anywhere else?",
        a: "Conversations are stored as part of your medical record for continuity of care, and are protected by the same access rules as the rest of your data.",
      },
    ],
    related: ["appointments", "prescriptions", "notifications"],
  },

  {
    slug: "notifications",
    title: "Notifications",
    tag: "NOTIFICATIONS",
    icon: Bell,
    accent: "#10B981",
    heroHeadline: "Never miss the moment that matters.",
    heroSubhead:
      "Appointment confirmations, new messages, bill updates, and results — delivered in real time, with full control over what you get and how.",
    stats: [
      { label: "Delivery", value: "Real-time push" },
      { label: "Categories", value: "6 notification types" },
      { label: "Control", value: "Per-category on/off" },
    ],
    capabilities: [
      {
        icon: BellRing,
        title: "Real-time push alerts",
        description:
          "Appointment reminders, message replies, bill postings, and lab results arrive the moment they happen.",
      },
      {
        icon: Settings2,
        title: "Granular preferences",
        description:
          "Turn specific categories on or off — keep appointment reminders, mute marketing-style updates, your choice.",
      },
      {
        icon: Volume2,
        title: "Quiet hours",
        description:
          "Set a time window where non-urgent notifications are held and delivered once quiet hours end.",
      },
      {
        icon: History,
        title: "Notification history",
        description:
          "Missed or dismissed something? Every notification is saved to an inbox you can revisit any time.",
      },
      {
        icon: BellOff,
        title: "Critical alerts always get through",
        description:
          "Certain categories — like an active access request — bypass mute settings since they need timely action.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Something happens in your care",
        description:
          "A bill is posted, a message arrives, a lab result is released, or an appointment approaches.",
      },
      {
        number: 2,
        title: "DigCare triggers a notification",
        description:
          "The relevant event generates a push notification matched to your preference settings.",
      },
      {
        number: 3,
        title: "You act directly from the alert",
        description:
          "Tapping a notification takes you straight to the appointment, bill, message, or result — no searching.",
      },
      {
        number: 4,
        title: "It's logged for later",
        description:
          "Every notification remains available in your in-app inbox, even after you've dismissed the push alert.",
      },
    ],
    goodToKnow: [
      {
        icon: CheckCircle2,
        text: "You can fully customise notifications by category from Settings — nothing is forced except critical account and access alerts.",
      },
      {
        icon: AlertTriangle,
        text: "Disabling push notifications at the OS level will still let you see everything inside the in-app notification inbox.",
      },
    ],
    faqs: [
      {
        q: "Can I turn off all notifications except appointment reminders?",
        a: "Yes — go to Settings → Notifications and toggle each category independently. Appointment reminders can stay on while everything else is muted.",
      },
      {
        q: "Will I still be notified about access requests if I mute notifications?",
        a: "Yes — access and security-related alerts are treated as critical and are never fully muted, to protect your data.",
      },
      {
        q: "Do notifications work without an internet connection?",
        a: "Push delivery requires connectivity, but once you're back online, any notifications that fired while you were offline will appear in your inbox.",
      },
    ],
    related: ["appointments", "messaging", "billing"],
  },

  {
    slug: "profile",
    title: "Profile",
    tag: "PROFILE",
    icon: User,
    accent: "#10B981",
    heroHeadline: "One accurate profile, trusted everywhere.",
    heroSubhead:
      "Your personal details, contact info, and account settings — kept accurate so every facility you visit on DigCare sees the same, up-to-date you.",
    stats: [
      { label: "Synced across", value: "Every DigCare facility" },
      { label: "Security", value: "PIN + OTP protected" },
      { label: "Editable anytime", value: "Yes, by you" },
    ],
    capabilities: [
      {
        icon: UserCog,
        title: "Personal information",
        description:
          "Name, date of birth, contact number, and address stay accurate and consistent across every facility you use.",
      },
      {
        icon: Camera,
        title: "Profile photo",
        description:
          "Upload a clear photo used for identity confirmation alongside your Health Card at facilities.",
      },
      {
        icon: KeyRound,
        title: "Security settings",
        description:
          "Manage your login PIN, enable OTP verification for sensitive actions, and review active sessions.",
      },
      {
        icon: ShieldCheck,
        title: "Emergency contact",
        description:
          "Store a trusted contact that facilities can reach in case of emergency, visible only when clinically needed.",
      },
      {
        icon: Settings2,
        title: "Preferences",
        description:
          "Language, patient type (Adult, Student, Visitor), and app-wide display preferences live here too.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Fill in your core details",
        description:
          "On sign-up, enter your name, date of birth, and contact details — this becomes your canonical profile.",
      },
      {
        number: 2,
        title: "Add a profile photo",
        description:
          "Upload a clear photo so facility staff can visually confirm your identity alongside your Health Card.",
      },
      {
        number: 3,
        title: "Secure your account",
        description:
          "Set a login PIN and enable OTP for sensitive actions like approving access requests or large payments.",
      },
      {
        number: 4,
        title: "Keep it current",
        description:
          "Update your number, address, or emergency contact any time — changes sync instantly across every facility.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldCheck,
        text: "Changing security-sensitive fields (like your phone number) requires OTP re-verification, even if you're already logged in.",
      },
      {
        icon: CheckCircle2,
        text: "Your patient type (Adult, Student, Visitor) determines your dashboard theme and available quick actions, and can be updated as your situation changes.",
      },
    ],
    faqs: [
      {
        q: "Will facilities see my profile changes immediately?",
        a: "Yes — your profile is centralised, so an update (like a new phone number) is instantly visible everywhere, not just at one facility.",
      },
      {
        q: "Can I have more than one emergency contact?",
        a: "Currently you can set one primary emergency contact, visible to facility staff only when clinically relevant, such as during an emergency admission.",
      },
      {
        q: "What if I need to change my patient type from Student to Adult?",
        a: "This updates automatically if your enrolment status changes through a partnered institution, or you can request the change directly from your Profile settings.",
      },
    ],
    related: ["access-control", "health-card", "notifications"],
  },
];

export function getFeatureBySlug(slug: string): PatientFeature | undefined {
  return patientFeatures.find((f) => f.slug === slug);
}

export function getFeatureSlugs(): string[] {
  return patientFeatures.map((f) => f.slug);
}
