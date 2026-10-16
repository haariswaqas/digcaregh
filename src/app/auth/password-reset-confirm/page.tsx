import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset your password | DigCare",
  robots: { index: false },
};

// Patients and doctors land here from the password-reset email or SMS:
// /auth/password-reset-confirm?uidb64=...&token=...
export default function PasswordResetConfirmPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[#f9fafb] px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-md">
        {/* The form reads the link's query string, so it renders on the client. */}
        <Suspense fallback={<div className="h-[420px] rounded-3xl border border-gray-100 bg-white" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
