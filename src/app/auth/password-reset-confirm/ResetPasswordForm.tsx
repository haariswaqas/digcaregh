"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, Eye, EyeOff, KeyRound, LoaderCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API;
const MIN_LENGTH = 8;

const inputClass =
  "w-full px-4 py-3.5 pr-12 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm";

// The API answers with DRF errors: {"new_password": [...]}, {"non_field_errors": [...]},
// {"detail": "..."} or {"error": "..."}.
function errorMessage(body: unknown): string {
  if (body && typeof body === "object") {
    for (const key of ["new_password", "non_field_errors", "token", "uidb64", "detail", "error"]) {
      const value = (body as Record<string, unknown>)[key];
      if (Array.isArray(value) && value.length) return value.map(String).join(" ");
      if (typeof value === "string" && value) return value;
    }
  }
  return "We couldn't reset your password. Please try again.";
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const uidb64 = params.get("uidb64") ?? "";
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password.length < MIN_LENGTH) return setError(`Use at least ${MIN_LENGTH} characters.`);
    if (password !== confirm) return setError("The two passwords don't match.");

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/password-reset-confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uidb64, token, new_password: password }),
      });
      if (response.ok) {
        setDone(true);
      } else {
        setError(errorMessage(await response.json().catch(() => null)));
      }
    } catch {
      setError("Couldn't reach DigCare. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const card = "bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100";

  if (!uidb64 || !token) {
    return (
      <div className={`${card} text-center`}>
        <CircleAlert className="mx-auto mb-4 text-amber-500" size={40} />
        <h1 className="font-heading text-2xl font-bold text-gray-900">This link is incomplete</h1>
        <p className="mt-3 text-gray-600">
          Open the reset link from your DigCare email or SMS again, or request a new one from the DigCare app.
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className={`${card} text-center`}>
        <CircleCheck className="mx-auto mb-4 text-[#0a9c5a]" size={40} />
        <h1 className="font-heading text-2xl font-bold text-gray-900">Password updated</h1>
        <p className="mt-3 text-gray-600">You can now sign in to DigCare with your new password.</p>
        <Link href="/" className="mt-6 inline-block font-semibold text-[#0a9c5a] hover:underline">
          Back to DigCare
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${card} space-y-6`}>
      <div>
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a9c5a]/10 text-[#0a9c5a]">
          <KeyRound size={22} />
        </span>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Choose a new password</h1>
        <p className="mt-2 text-sm text-gray-600">
          Use at least {MIN_LENGTH} characters, and avoid anything close to your name or email.
        </p>
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <CircleAlert size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <PasswordField id="new-password" label="New password" value={password} onChange={setPassword} autoComplete="new-password" />
      <PasswordField id="confirm-password" label="Confirm new password" value={confirm} onChange={setConfirm} autoComplete="new-password" />

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-[#1a2b3c] hover:bg-[#111e2b] text-white py-4 rounded-xl font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting && <LoaderCircle size={18} className="animate-spin" />}
        {submitting ? "Saving..." : "Reset password"}
      </button>
    </form>
  );
}
