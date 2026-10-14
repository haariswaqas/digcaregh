import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeatureBySlug, getFeatureSlugs } from "../_data/features";
import FeatureDetailContent from "./FeatureDetailContent";

interface FeaturePageProps {
  params: Promise<{ feature: string }>;
}

export function generateStaticParams() {
  return getFeatureSlugs().map((feature) => ({ feature }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { feature: slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    return { title: "Feature — DigCare" };
  }

  const title = `${feature.title} for Patients — DigCare`;
  const description = feature.heroSubhead;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const { feature: slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  return <FeatureDetailContent slug={slug} />;
}
