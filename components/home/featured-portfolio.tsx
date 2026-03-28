import Link from "next/link";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Section } from "@/components/shared/section";
import type { PortfolioItem } from "@/types/content";

interface FeaturedPortfolioProps {
  items: PortfolioItem[];
}

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  return (
    <Section className="pt-2 lg:pt-8" containerClassName="px-0 lg:px-6">
      <div className="mb-4 hidden items-end justify-between gap-4 px-4 lg:mb-6 lg:flex lg:px-0">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Photo Work</p>
          <h2 className="text-xl font-semibold text-ink lg:text-2xl">Selected image work.</h2>
        </div>
        <Link href="/portfolio" className="hidden text-sm font-medium text-ink/70 hover:text-clay sm:inline-flex">
          More
        </Link>
      </div>

      <PortfolioGrid items={items} detailHrefBuilder={(item) => `/portfolio/${item.slug}`} />
    </Section>
  );
}
