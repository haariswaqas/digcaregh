"use client";

export default function MainWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="transition-all duration-300 pt-16 w-full">
            {children}
        </main>
    );
}