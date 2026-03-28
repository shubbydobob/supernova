import Link from "next/link";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Section } from "@/components/shared/section";
import type { PortfolioItem } from "@/types/content";

interface FeaturedPortfolioProps {
  items: PortfolioItem[];
}

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  return (
    <Section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Photo Work</p>
          <h2 className="text-2xl font-semibold text-ink">Selected image work.</h2>
        </div>
        <Link href="/portfolio" className="hidden text-sm font-medium text-ink/70 hover:text-clay sm:inline-flex">
          More
        </Link>
      </div>

      <PortfolioGrid items={items} detailHrefBuilder={(item) => `/portfolio/${item.slug}`} />
    </Section>
  );
}
