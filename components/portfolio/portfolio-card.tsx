import Link from "next/link";

import { OptimizedImage } from "@/components/shared/optimized-image";
import type { PortfolioItem } from "@/types/content";

interface PortfolioCardProps {
  item: PortfolioItem;
  href?: string;
}

export function PortfolioCard({ item, href }: PortfolioCardProps) {
  const safeHref = href ?? `/portfolio/${item.slug}`;

  return (
    <article
      id={item.slug}
      className="overflow-hidden bg-white md:rounded-[1.75rem] md:border md:border-stone md:shadow-card"
    >
      <Link href={safeHref} className="block">
        <OptimizedImage
          src={item.thumbnail}
          alt={item.title}
          width={900}
          height={1100}
          wrapperClassName="bg-sand"
          className="aspect-[11/10] md:aspect-[4/5]"
        />
      </Link>
      <div className="space-y-2 px-4 py-4 md:px-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{item.category}</p>
        <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
        <Link href={safeHref} className="inline-flex text-sm font-semibold text-ink hover:text-clay">
          View work
        </Link>
      </div>
    </article>
  );
}
