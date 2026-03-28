import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "@/components/shared/section";
import type { ShootService } from "@/types/content";

interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <Section className="bg-white/70 pt-4 lg:pt-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Shoot</p>
        <h2 className="text-xl font-semibold text-ink lg:text-2xl">Simple options.</h2>
      </div>

      <div className="mt-5 lg:mt-8">
        <ServiceGrid services={services} detailHrefBuilder={(service) => `/services/${service.slug}`} />
      </div>
    </Section>
  );
}
