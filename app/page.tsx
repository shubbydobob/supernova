import type { Metadata } from "next";

import { FeaturedPortfolio } from "@/components/home/featured-portfolio";
import { HomeCategoryNav } from "@/components/home/home-category-nav";
import { HeroSection } from "@/components/home/hero-section";
import { MainVideoSection } from "@/components/home/main-video-section";
import { ProfileSliderSection } from "@/components/home/profile-slider-section";
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

  const profileSlides = [
    {
      image: heroItem.images[1] ?? heroItem.thumbnail,
      title: "자연광 프로필 촬영",
      href: `/portfolio/${heroItem.slug}`,
      linkLabel: "자세히 살펴보기",
    },
    {
      image: "/images/custom/woman-profile-03.png",
      title: "자연광 주근깨 컨셉 촬영",
      href: `/portfolio/${heroItem.slug}`,
      linkLabel: "자세히 살펴보기",
    },
    {
      image: "/images/custom/lookbook-kid.jpg",
      title: "LOOKBOOK KIDS 촬영",
      href: "/services",
      linkLabel: "자세히 살펴보기",
    },
    {
      image: "/images/custom/lookbook-adult.jpg",
      title: "LOOKBOOK ADULT 촬영",
      href: "/services",
      linkLabel: "자세히 살펴보기",
    },
  ];

  return (
    <>
      <HomeCategoryNav items={config.navigation.header} />
      <HeroSection config={config} heroItem={heroItem} />
      <ProfileSliderSection items={profileSlides} />
      <FeaturedPortfolio />
      <ServicesOverview services={featuredServices} />
      <MainVideoSection />

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
