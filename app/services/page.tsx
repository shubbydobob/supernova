import type { Metadata } from "next";

import { ServiceGrid } from "@/components/services/service-grid";
import { CTAButton } from "@/components/shared/cta-button";
import { PageIntro } from "@/components/shared/page-intro";
import { Section } from "@/components/shared/section";
import { getShootServices, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Services",
    description: "Explore available photography services with key details and external Naver reservation compatibility.",
    openGraph: {
      title: `Services | ${config.site.title}`,
      description: "Explore available photography services with key details and external Naver reservation compatibility.",
      url: `${config.site.url}/services`,
    },
  };
}

export default async function ServicesPage() {
  const services = await getShootServices();

  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Simple shoot options."
        description=""
        actions={
          <>
            <CTAButton href="/portfolio">Portfolio</CTAButton>
          </>
        }
      />

      <Section>
        <ServiceGrid services={services} />
      </Section>
    </>
  );
}
