import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/ServiceDetailClient";

export function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({ slug }));
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = servicesData[slug];
    if (!service) notFound();

    return <ServiceDetailClient service={service} />;
}