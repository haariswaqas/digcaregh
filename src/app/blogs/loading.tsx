function Bar({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-full ${className}`} />;
}

export default function BlogsLoading() {
    return (
        <div className="bg-white" aria-busy="true" aria-label="Loading articles">
            <section className="relative overflow-hidden bg-[#0B1120] pb-20 pt-20 md:pb-28 md:pt-28">
                <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_25%,transparent_75%)]" />
                <div className="relative mx-auto max-w-[1200px] px-6">
                    <Bar className="h-7 w-48 bg-white/10" />
                    <Bar className="mt-8 h-14 w-full max-w-[640px] bg-white/10" />
                    <Bar className="mt-4 h-5 w-full max-w-[520px] bg-white/[0.06]" />
                    <Bar className="mt-2 h-5 w-full max-w-[420px] bg-white/[0.06]" />
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-[1200px] px-6">
                    <div className="mb-10 flex gap-2">
                        {[110, 130, 150, 120].map((w) => (
                            <div key={w} className="h-9 animate-pulse rounded-full bg-slate-100" style={{ width: w }} />
                        ))}
                    </div>
                    <div className="h-[380px] animate-pulse rounded-[2rem] bg-slate-100" />
                    <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="overflow-hidden rounded-[1.75rem] border border-slate-100">
                                <div className="aspect-[16/10] animate-pulse bg-slate-100" />
                                <div className="space-y-3 p-6">
                                    <Bar className="h-5 w-4/5 bg-slate-100" />
                                    <Bar className="h-4 w-full bg-slate-100" />
                                    <Bar className="h-4 w-2/3 bg-slate-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
