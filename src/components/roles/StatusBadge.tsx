"use client";

type StatusType = "active" | "inactive" | "suspended" | "pending";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<StatusType, { bg: string; text: string; border?: string; label: string }> = {
  active: { bg: "#D1FAE5", text: "#065F46", label: "Active" },
  inactive: { bg: "#F3F4F6", text: "#6B7280", label: "Inactive" },
  suspended: { bg: "#FEF3C7", text: "#92400E", label: "Suspended" },
  pending: { bg: "#FEF3C7", text: "#92400E", border: "1px dashed #D97706", label: "Pending" },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
      style={{
        background: config.bg,
        color: config.text,
        border: config.border,
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.text }}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
