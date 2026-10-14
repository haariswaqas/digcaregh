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
  ShieldOff,
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

export interface PatientFeature {
  slug: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  accent: string;
  heroHeadline: string;
  heroSubhead: string;
  stats: FeatureStat[];
  capabilities: FeatureCapability[];
  steps: FeatureStep[];
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
      "Find a facility, pick a doctor, choose in-person or video, and confirm — your whole booking flow lives in one screen, with reminders that keep you from missing it.",
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
    steps: [
      {
        number: 1,
        title: "Choose a facility or doctor",
        description:
          "Search DigCare's network by location, specialty, or a doctor you've seen before.",
      },
      {
        number: 2,
        title: "Pick a slot",
        description:
          "Select an open date and time, and whether you want an in-person visit or a teleconsult.",
      },
      {
        number: 3,
        title: "Confirm your details",
        description:
          "Add a short reason for the visit so your doctor arrives prepared, then confirm the booking.",
      },
      {
        number: 4,
        title: "Get reminded & show up",
        description:
          "Receive confirmation instantly, then reminders as the appointment approaches. Join by video or walk in.",
      },
    ],
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
      "See exactly what's been prescribed, which pharmacy has dispensed it, and what's still pending — so you never lose track of a medication again.",
    stats: [
      { label: "Status tracking", value: "Issued → Dispensed" },
      { label: "History retained", value: "Entire patient record" },
      { label: "Refill requests", value: "In-app, to your doctor" },
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
        title: "Dispensed vs. pending",
        description:
          "A clear status badge shows what's already been collected at a pharmacy and what's still outstanding.",
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
    steps: [
      {
        number: 1,
        title: "Doctor issues a prescription",
        description:
          "After a visit, your doctor logs the prescription directly to your DigCare record.",
      },
      {
        number: 2,
        title: "You get notified instantly",
        description:
          "A push notification tells you a new prescription is ready, with full dosage instructions.",
      },
      {
        number: 3,
        title: "Collect at any linked pharmacy",
        description:
          "Show your Health Card QR at a partner pharmacy — they verify and dispense without you needing a paper copy.",
      },
      {
        number: 4,
        title: "Status updates to Dispensed",
        description:
          "The moment it's collected, your record updates automatically, closing the loop for you and your doctor.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldAlert,
        text: "Controlled medications may require an additional PIN or OTP confirmation at the pharmacy for your protection.",
      },
      {
        icon: CheckCircle2,
        text: "Refill requests still require clinical review — they are not auto-approved, even for repeat medications.",
      },
    ],
    faqs: [
      {
        q: "Can I pick up a prescription at any pharmacy?",
        a: "Only at pharmacies that are part of the DigCare network. Your app shows nearby linked pharmacies so you can check before you go.",
      },
      {
        q: "What if I lose access to my phone?",
        a: "A pharmacist can also verify your identity manually with ID, but the QR flow is the fastest and most secure option.",
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
    heroHeadline: "One card. Every facility. Always with you.",
    heroSubhead:
      "Your digital health identity — a unique card number and QR code that any DigCare-connected facility can scan to pull up exactly what you've approved them to see.",
    stats: [
      { label: "Format", value: "Digital, QR-based" },
      { label: "Accepted at", value: "Every linked facility" },
      { label: "Logged on scan", value: "Every access event" },
    ],
    capabilities: [
      {
        icon: QrCode,
        title: "Scan-to-identify",
        description:
          "A unique QR code identifies you instantly at reception, pharmacy, or lab — no forms, no repeating your history out loud.",
      },
      {
        icon: Smartphone,
        title: "Always on your phone",
        description:
          "No physical card to forget or lose — your Health Card lives in the app and works offline once loaded.",
      },
      {
        icon: BadgeCheck,
        title: "Card type & validity",
        description:
          "See your card type (Adult, Student, Visitor), issue date, and expiry at a glance.",
      },
      {
        icon: History,
        title: "Full scan history",
        description:
          "Every time your card is scanned, it's logged with the facility, time, and purpose — visible to you under Access Control.",
      },
      {
        icon: Lock,
        title: "Consent-gated by design",
        description:
          "A scan identifies you — it does not automatically unlock your full record. Deeper access still requires your approval.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "Card issued on sign-up",
        description:
          "Your Health Card is generated automatically the moment your DigCare profile is verified.",
      },
      {
        number: 2,
        title: "Open it at any visit",
        description:
          "Pull up your QR code from the Health Card tab when you arrive at a facility, lab, or pharmacy.",
      },
      {
        number: 3,
        title: "Staff scan to identify you",
        description:
          "Reception or pharmacy staff scan the code to confirm your identity and pull up your active visit.",
      },
      {
        number: 4,
        title: "Access event is logged",
        description:
          "The scan is recorded immediately to your access history — you can review it any time.",
      },
    ],
    goodToKnow: [
      {
        icon: Lock,
        text: "A scan alone cannot expose your full medical history — sensitive record access still routes through the Access Control approval flow.",
      },
      {
        icon: ShieldAlert,
        text: "If you ever suspect your card has been misused, you can flag an access event directly from your scan history.",
      },
    ],
    faqs: [
      {
        q: "What if I lose my phone?",
        a: "Your Health Card is tied to your account, not your device — sign in on a new phone and it regenerates instantly. You can also deactivate the old session remotely.",
      },
      {
        q: "Do I need internet access to show my card?",
        a: "Once loaded, your QR code is cached locally and can be displayed without an active connection — only the scan verification requires the facility to be online.",
      },
      {
        q: "Can my card type change?",
        a: "Yes — for example, a Student card converts to an Adult card automatically once your enrolment status changes, or on request to support.",
      },
    ],
    related: ["access-control", "appointments", "insurance"],
  },

  {
    slug: "access-control",
    title: "Access Control",
    tag: "ACCESS CONTROL",
    icon: Lock,
    accent: "#10B981",
    heroHeadline: "Your data. Your rules. No exceptions.",
    heroSubhead:
      "Every provider who requests or accesses your records shows up here. You approve, deny, or revoke access — and nothing happens behind your back.",
    stats: [
      { label: "Default access", value: "None, until you approve" },
      { label: "Revocation", value: "Instant, any time" },
      { label: "Audit trail", value: "Every event, timestamped" },
    ],
    capabilities: [
      {
        icon: UserCheck,
        title: "Approve or deny requests",
        description:
          "When a new doctor or facility requests access to your record, you get a clear request with their identity and reason — you decide.",
      },
      {
        icon: Eye,
        title: "See who's looked, and when",
        description:
          "A full audit log shows every provider who has viewed your record, what they viewed, and the exact timestamp.",
      },
      {
        icon: ShieldOff,
        title: "Revoke access instantly",
        description:
          "Changed your mind, or finished treatment with a provider? Revoke their access immediately — no waiting period.",
      },
      {
        icon: Clock3,
        title: "Time-limited grants",
        description:
          "Grant access for a single visit, a set period, or indefinitely — you choose the scope every time.",
      },
      {
        icon: KeyRound,
        title: "Sensitive-action verification",
        description:
          "Particularly sensitive approvals (like full history access) require an additional PIN or OTP step from you.",
      },
    ],
    steps: [
      {
        number: 1,
        title: "A provider requests access",
        description:
          "A doctor or facility outside your existing care circle requests access to some or all of your record.",
      },
      {
        number: 2,
        title: "You review the request",
        description:
          "See who's asking, which facility they're from, and what exactly they're requesting access to.",
      },
      {
        number: 3,
        title: "Approve, deny, or scope it",
        description:
          "Grant full access, limit it to a specific visit or record type, or deny the request outright.",
      },
      {
        number: 4,
        title: "Monitor and revoke any time",
        description:
          "Access stays visible on your Access Control tab for as long as it's active — revoke it whenever you want.",
      },
    ],
    goodToKnow: [
      {
        icon: ShieldAlert,
        text: "Emergency access (e.g. unconscious patient in an ER) follows a separate, heavily logged break-glass protocol that notifies you the moment you're reachable.",
      },
      {
        icon: CheckCircle2,
        text: "Your existing care team (doctors actively treating you) don't need repeated approval for routine follow-ups within an active treatment window.",
      },
    ],
    faqs: [
      {
        q: "Can a facility see my records just because I walked in?",
        a: "No. Walking into a facility or having your Health Card scanned only confirms your identity — viewing your actual medical record still requires your explicit approval.",
      },
      {
        q: "What happens if I deny a request?",
        a: "The requesting provider is notified that access was denied. They can still treat you based on what you tell them directly, just without your historical record.",
      },
      {
        q: "Can I see exactly what a doctor viewed?",
        a: "Yes — the audit log breaks down not just that they accessed your record, but which sections (e.g. lab results vs. prescriptions) they opened.",
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
