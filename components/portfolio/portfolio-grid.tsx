import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import type { PortfolioItem } from "@/types/content";

interface PortfolioGridProps {
  items: PortfolioItem[];
  detailHrefBuilder?: (item: PortfolioItem) => string;
}

export function PortfolioGrid({ items, detailHrefBuilder }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-stone bg-white/70 p-8 text-sm text-ink/70">
        No portfolio items are available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <PortfolioCard key={item.slug} item={item} href={detailHrefBuilder?.(item)} />
      ))}
    </div>
  );
}
