function Bar({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-full bg-slate-200/70 ${className}`} />;
}

export default function ArticleLoading() {
    return (
        <div className="bg-white" aria-busy="true" aria-label="Loading article">
            <header className="bg-[#F6FBF9] pb-40 pt-10 md:pt-14">
                <div className="mx-auto max-w-[820px] px-6">
                    <Bar className="h-8 w-28" />
                    <Bar className="mt-10 h-6 w-32" />
                    <Bar className="mt-6 h-12 w-full" />
                    <Bar className="mt-3 h-12 w-3/4" />
                    <Bar className="mt-8 h-5 w-full" />
                    <Bar className="mt-2 h-5 w-5/6" />
                    <div className="mt-9 flex items-center gap-3">
                        <div className="h-11 w-11 animate-pulse rounded-full bg-slate-200/70" />
                        <Bar className="h-4 w-40" />
                    </div>
                </div>
            </header>
            <div className="mx-auto -mt-28 max-w-[1080px] px-6">
                <div className="aspect-[16/8.5] w-full animate-pulse rounded-[2rem] border-4 border-white bg-slate-100" />
            </div>
            <div className="mx-auto max-w-[720px] space-y-4 px-6 pb-24 pt-14">
                {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((w, i) => (
                    <Bar key={i} className={`h-4 ${w}`} />
                ))}
            </div>
        </div>
    );
}
