import { ProfileSliderSection } from "@/components/home/profile-slider-section";
import type { ShootService } from "@/types/content";

interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const sliderItems = services.map((service) => ({
    image: service.images[0] ?? service.seo.ogImage ?? "",
    title: service.title,
    href: `/services/${service.slug}`,
    linkLabel: "자세히 살펴보기",
  }));

  return (
    <ProfileSliderSection title="ART WORKS" items={sliderItems} />
  );
}
