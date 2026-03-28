import type { PortfolioItem } from "@/types/content";

interface PortfolioMetaProps {
  item: PortfolioItem;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function PortfolioMeta({ item }: PortfolioMetaProps) {
  return (
    <section aria-labelledby="portfolio-summary-heading" className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">{item.category}</p>
        <h1 id="portfolio-summary-heading" className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {item.title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-ink/75">{item.description}</p>
      </div>

      <dl className="grid gap-4 rounded-[1.75rem] border border-stone bg-white/80 p-5 text-sm text-ink/75 shadow-card sm:grid-cols-2">
        <div>
          <dt className="font-medium text-ink">Category</dt>
          <dd>{item.category}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink">Date</dt>
          <dd>{formatDate(item.date)}</dd>
        </div>
      </dl>
    </section>
  );
}
