import { CTAButton } from "@/components/shared/cta-button";
import { OptimizedImage } from "@/components/shared/optimized-image";
import type { ShootService } from "@/types/content";

interface ServiceCardProps {
  service: ShootService;
  detailHref?: string;
}

export function ServiceCard({ service, detailHref }: ServiceCardProps) {
  const safeHref = detailHref ?? `/services/${service.slug}`;

  return (
    <article
      id={service.slug}
      className="overflow-hidden rounded-[1.75rem] border border-stone bg-white shadow-card"
    >
      <OptimizedImage
        src={service.images[0] ?? service.seo.ogImage ?? "/images/reference/home-hero-01.jpeg"}
        alt={service.title}
        width={1200}
        height={1500}
        wrapperClassName="bg-sand"
        className="aspect-[4/5]"
      />
      <div className="space-y-4 px-1 py-4 sm:px-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
          <p className="text-sm leading-6 text-ink/70">{service.shortDescription}</p>
        </div>
        <dl className="grid gap-2 text-sm text-ink/75">
          <div>
            <dt className="font-medium text-ink">Pricing</dt>
            <dd>{service.pricing}</dd>
          </div>
        </dl>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={safeHref} variant="secondary">
            Learn more
          </CTAButton>
          <CTAButton href={service.bookingUrl} external>
            Reserve on Naver
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
