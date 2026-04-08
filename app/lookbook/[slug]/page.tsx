import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetails } from "@/components/services/service-details";
import { Section } from "@/components/shared/section";
import { getShootService, getShootServices, getSiteConfig } from "@/lib/content";

interface LookbookDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getShootServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: LookbookDetailPageProps): Promise<Metadata> {
  const [{ slug }, config] = await Promise.all([params, getSiteConfig()]);
  const service = await getShootService(slug);

  if (!service) {
    return {
      title: "Lookbook Not Found",
    };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${config.site.url}/lookbook/${service.slug}`,
      images: service.seo.ogImage ? [{ url: service.seo.ogImage }] : undefined,
    },
  };
}

export default async function LookbookDetailPage({ params }: LookbookDetailPageProps) {
  const { slug } = await params;
  const service = await getShootService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Section className="pt-6 sm:pt-10">
        <ServiceDetails service={service} />
      </Section>
    </>
  );
}
