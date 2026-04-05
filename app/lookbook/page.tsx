import type { Metadata } from "next";

import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "@/components/shared/section";
import { getShootServices, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Lookbook",
    description: "Explore available lookbook sessions and reserve externally through Naver Booking.",
    openGraph: {
      title: `Lookbook | ${config.site.title}`,
      description: "Explore available lookbook sessions and reserve externally through Naver Booking.",
      url: `${config.site.url}/lookbook`,
    },
  };
}

export default async function LookbookPage() {
  const services = await getShootServices();

  return (
    <Section>
      <ServiceGrid services={services} detailHrefBuilder={(service) => `/lookbook/${service.slug}`} />
    </Section>
  );
}
