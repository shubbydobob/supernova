import { CTAButton } from "@/components/shared/cta-button";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";
import type { PortfolioItem, SiteConfig } from "@/types/content";

interface HeroSectionProps {
  config: SiteConfig;
  heroItem: PortfolioItem;
}

export function HeroSection({ config, heroItem }: HeroSectionProps) {
  const heroImage = heroItem.images[0] ?? heroItem.thumbnail;

  return (
    <Section className="pt-0 lg:pt-4" containerClassName="space-y-0 px-0 lg:space-y-4 lg:px-6">
      <div className="hidden lg:block">
        <h1 className="max-w-2xl font-serif text-[2.5rem] uppercase leading-none tracking-[-0.04em] text-ink">
          {config.brand.tagline}
        </h1>
      </div>

      <OptimizedImage
        src={heroImage}
        alt={heroItem.title}
        width={1600}
        height={1200}
        priority
        wrapperClassName="overflow-hidden bg-white lg:rounded-[2rem] lg:border lg:border-stone lg:shadow-card"
        className="aspect-[11/10] object-contain object-top lg:aspect-[16/10] lg:object-cover"
      />

      <div className="hidden flex-col items-start gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-clay">{heroItem.category}</p>
          <p className="text-lg font-semibold text-ink">{heroItem.title}</p>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          <CTAButton href="/portfolio">View portfolio</CTAButton>
          <CTAButton href="/services" variant="secondary">
            Explore services
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
