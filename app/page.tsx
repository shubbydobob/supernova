import type { Metadata } from "next";

import { FeaturedPortfolio } from "@/components/home/featured-portfolio";
import { HomeCategoryNav } from "@/components/home/home-category-nav";
import { HeroSection } from "@/components/home/hero-section";
import { MainVideoSection } from "@/components/home/main-video-section";
import { ServicesOverview } from "@/components/home/services-overview";
import { CTAButton } from "@/components/shared/cta-button";
import { Section } from "@/components/shared/section";
import { getFeaturedPortfolioItems, getFeaturedShootServices, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: config.site.title,
    description: config.site.description,
  };
}

export default async function HomePage() {
  const [config, featuredPortfolio, featuredServices] = await Promise.all([
    getSiteConfig(),
    getFeaturedPortfolioItems(),
    getFeaturedShootServices(),
  ]);

  const heroItem = featuredPortfolio[0];

  if (!heroItem) {
    throw new Error("Home page requires at least one featured portfolio item.");
  }

  return (
    <>
      <HomeCategoryNav items={config.navigation.header} />
      <HeroSection config={config} heroItem={heroItem} />
      <MainVideoSection />
      <FeaturedPortfolio items={featuredPortfolio} />
      <ServicesOverview services={featuredServices} />

      <Section className="pt-2 lg:pt-4">
        <div className="flex flex-col gap-3 border-t border-stone/80 pt-5 sm:flex-row lg:pt-8">
          <CTAButton href="/portfolio">Portfolio</CTAButton>
          <CTAButton href="/services" variant="secondary">
            Services
          </CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Contact
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
