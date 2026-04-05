import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Section } from "@/components/shared/section";
import { getPortfolioItems, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Profile",
    description: "Browse featured photography work across weddings, portraits, and commercial storytelling.",
    openGraph: {
      title: `Profile | ${config.site.title}`,
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
      <Section className="pt-6 sm:pt-10">
        <div className="border-b border-stone/80 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Profile</p>
        </div>
      </Section>

      <Section>
        <PortfolioGrid items={visibleItems} />
      </Section>
    </>
  );
}
