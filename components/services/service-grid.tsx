import { ServiceCard } from "@/components/services/service-card";
import type { ShootService } from "@/types/content";

interface ServiceGridProps {
  services: ShootService[];
  detailHrefBuilder?: (service: ShootService) => string;
}

export function ServiceGrid({ services, detailHrefBuilder }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-stone bg-white/70 p-8 text-sm text-ink/70">
        No services are available yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} detailHref={detailHrefBuilder?.(service)} />
      ))}
    </div>
  );
}
