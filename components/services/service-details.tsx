import { OptimizedImage } from "@/components/shared/optimized-image";
import type { ShootService } from "@/types/content";

interface ServiceDetailsProps {
  service: ShootService;
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="space-y-10">
      <section aria-labelledby="service-overview-heading" className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Service Overview</p>
          <h1 id="service-overview-heading" className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/75">{service.description}</p>
        </div>

        <dl className="grid gap-4 rounded-[1.75rem] border border-stone bg-white/80 p-5 text-sm text-ink/75 shadow-card sm:grid-cols-2">
          <div>
            <dt className="font-medium text-ink">Pricing</dt>
            <dd>{service.pricing}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Duration</dt>
            <dd>{service.duration}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="service-gallery-heading" className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Sample Images</p>
          <h2 id="service-gallery-heading" className="text-2xl font-semibold text-ink">
            Recent examples
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {service.images.map((image, index) => (
            <OptimizedImage
              key={image}
              src={image}
              alt={`${service.title} sample ${index + 1}`}
              width={1200}
              height={900}
              wrapperClassName={index === 0 ? "overflow-hidden rounded-[1.75rem] border border-stone bg-white shadow-card md:col-span-2" : "overflow-hidden rounded-[1.75rem] border border-stone bg-white shadow-card"}
              className={index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="service-deliverables-heading" className="rounded-[1.75rem] border border-stone bg-sand/60 p-6 shadow-card">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">What&apos;s Included</p>
          <h2 id="service-deliverables-heading" className="text-2xl font-semibold text-ink">
            Deliverables and preparation
          </h2>
          <ul className="space-y-3 text-sm leading-6 text-ink/75 sm:text-base">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="rounded-2xl bg-white/70 px-4 py-3">
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
