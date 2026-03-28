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
    <Section className="pt-0 sm:pt-10" containerClassName="space-y-0 sm:space-y-6">
      <div className="hidden space-y-3 sm:block">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">SU.PERNOVA_</p>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {config.brand.tagline}
        </h1>
      </div>

      <OptimizedImage
        src={heroImage}
        alt={heroItem.title}
        width={1600}
        height={1200}
        priority
        wrapperClassName="overflow-hidden bg-white sm:rounded-[2rem] sm:border sm:border-stone sm:shadow-card"
        className="aspect-[4/5] sm:aspect-[16/10]"
      />

      <div className="hidden flex-col items-start gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-clay">{heroItem.category}</p>
          <p className="text-lg font-semibold text-ink">{heroItem.title}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/portfolio">View portfolio</CTAButton>
          <CTAButton href="/services" variant="secondary">
            Explore services
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
