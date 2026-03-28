import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "@/components/shared/section";
import type { ShootService } from "@/types/content";

interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <Section className="bg-white/70">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Shoot</p>
        <h2 className="text-2xl font-semibold text-ink">Simple options.</h2>
      </div>

      <div className="mt-8">
        <ServiceGrid services={services} detailHrefBuilder={(service) => `/services/${service.slug}`} />
      </div>
    </Section>
  );
}
