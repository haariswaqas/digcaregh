"use client";

import { type ServiceData } from "@/types/service";

interface Props {
    service: ServiceData;
}

export default function ServiceDetailClient({ service }: Props) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            {/* Hero */}
            <div className="pb-8 border-b border-gray-100">
                <div className="text-4xl mb-3">{service.icon}</div>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">
                    {service.title}
                </p>
                <h1 className="text-3xl font-semibold text-white mb-5 leading-snug">
                    {service.headline}
                </h1>
                <div className="space-y-3">
                    {service.description.map((para, i) => (
                        <p key={i} className="text-base text-gray-500 leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="py-8 border-b border-gray-100">
                <p className="text-xs font-medium uppercase tracking-widest text-white mb-5">
                    Features
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white border border-gray-100 rounded-xl p-4"
                        >
                            <div className="text-base mb-2">{feature.icon}</div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                                {feature.title}
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who it's for */}
            <div className="py-8 border-b border-gray-100">
                <p className="text-xs font-medium uppercase tracking-widest text-white mb-5">
                    Who it's for
                </p>
                <div className="flex flex-wrap gap-3">
                    {service.beneficiaries.map((b) => (
                        <div
                            key={b.role}
                            className="bg-gray-50 rounded-xl px-4 py-3 flex-1 min-w-35"
                        >
                            <p className="text-sm font-medium text-gray-900 mb-0.5">
                                {b.role}
                            </p>
                            <p className="text-xs text-gray-500 leading-snug">
                                {b.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it works */}
            <div className="py-8">
                <p className="text-xs font-medium uppercase tracking-widest text-white mb-5">
                    How it works
                </p>
                <div className="divide-y divide-gray-100">
                    {service.steps.map((s) => (
                        <div key={s.step} className="flex gap-4 items-start py-4">
                            <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-white shrink-0 mt-0.5">
                                {s.step}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white mb-0.5">
                                    {s.title}
                                </p>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
