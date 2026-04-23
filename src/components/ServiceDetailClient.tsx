"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { type ServiceData } from "@/types/service";

interface Props {
    service: ServiceData;
}

export default function ServiceDetailClient({ service }: Props) {
    // Auto-scroll to top when this component mounts (handles sidebar navigation)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [service.slug]);

    const router = useRouter();

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">

            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Back
            </button>

            {/* Hero */}
            <div className="pb-8 border-b border-border/50">
                <div className="text-4xl mb-3">{service.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                    {service.title}
                </p>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-5 leading-snug">
                    {service.headline}
                </h1>
                <div className="space-y-3">
                    {service.description.map((para, i) => (
                        <p key={i} className="text-base text-muted-foreground leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="py-8 border-b border-border/50">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                    Features
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                        <div
                            key={feature.title}
                            className="glass-card p-4 hover:border-primary/20 transition-colors"
                        >
                            <div className="text-xl mb-2">{feature.icon}</div>
                            <p className="text-sm font-semibold text-foreground mb-1">
                                {feature.title}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who it's for */}
            <div className="py-8 border-b border-border/50">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                    Who it's for
                </p>
                <div className="flex flex-wrap gap-3">
                    {service.beneficiaries.map((b) => (
                        <div
                            key={b.role}
                            className="glass-card px-4 py-3 flex-1 min-w-[140px]"
                        >
                            <p className="text-sm font-semibold text-foreground mb-0.5">
                                {b.role}
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug">
                                {b.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it works */}
            <div className="py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                    How it works
                </p>
                <div className="space-y-0">
                    {service.steps.map((s, i) => (
                        <div key={s.step} className="flex gap-4 items-start py-4 border-b border-border/30 last:border-0">
                            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                                {s.step}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground mb-1">
                                    {s.title}
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="glass-card p-6 text-center mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                    Interested in {service.title}? Be among the first to use DigCare.
                </p>
                <a href="/#waitlist" className="gradient-btn inline-block text-sm">
                    Join the Waitlist
                </a>
            </div>
        </div>
    );
}