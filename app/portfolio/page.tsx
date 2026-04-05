import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Section } from "@/components/shared/section";
import { getPortfolioItems, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Portfolio",
    description: "Browse featured photography work across weddings, portraits, and commercial storytelling.",
    openGraph: {
      title: `Portfolio | ${config.site.title}`,
      description: "Browse featured photography work across weddings, portraits, and commercial storytelling.",
      url: `${config.site.url}/portfolio`,
    },
  };
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems();
  const visibleItems = items.filter((item) => item.slug !== "editorial-cafe-campaign");

  return (
    <>
      <Section>
        <PortfolioGrid items={visibleItems} />
      </Section>
    </>
  );
}
