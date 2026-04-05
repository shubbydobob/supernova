import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BookingCTA } from "@/components/services/booking-cta";
import { ServiceDetails } from "@/components/services/service-details";
import { CTAButton } from "@/components/shared/cta-button";
import { Section } from "@/components/shared/section";
import { getShootService, getShootServices, getSiteConfig } from "@/lib/content";

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getShootServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const [{ slug }, config] = await Promise.all([params, getSiteConfig()]);
  const service = await getShootService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `${config.site.url}/services/${service.slug}`,
      images: service.seo.ogImage ? [{ url: service.seo.ogImage }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getShootService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Lookbook", href: "/services" },
          { label: service.title },
        ]}
      />

      <Section className="pt-10 sm:pt-14">
        <ServiceDetails service={service} />
      </Section>

      <Section className="pt-0">
        <BookingCTA bookingUrl={service.bookingUrl} serviceName={service.title} />
      </Section>

      <Section className="pt-0">
        <div className="rounded-[1.75rem] border border-stone bg-white/80 p-6 shadow-card sm:p-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Continue Exploring</p>
            <h2 className="text-2xl font-semibold text-ink">See related work before you reserve.</h2>
            <p className="max-w-2xl text-sm leading-6 text-ink/75 sm:text-base">
              See the work first, or ask before booking.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/portfolio">View portfolio</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Contact the studio
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
