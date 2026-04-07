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
    <article id={item.slug} className="group">
      <Link href={safeHref} className="block">
        <OptimizedImage
          src={item.thumbnail}
          alt={item.title}
          width={900}
          height={1100}
          wrapperClassName="bg-sand overflow-hidden"
          className="aspect-[3/4] object-cover transition-opacity group-hover:opacity-90"
        />
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-normal text-ink">{item.title}</h3>
        </div>
      </Link>
    </article>
  );
}
