import Link from "next/link";
import artWorkImage from "@/screen/art_work.jpg";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";

export function FeaturedPortfolio() {
  return (
    <Section className="pt-2 lg:pt-8" containerClassName="px-0 lg:px-6">
      <Link href="/portfolio" className="block">
        <OptimizedImage
          src={artWorkImage}
          alt="Selected image work"
          priority
          className="aspect-[48/19] object-cover object-center"
          wrapperClassName="bg-sand md:rounded-[1.75rem] md:shadow-card"
          sizes="(min-width: 1280px) 1120px, (min-width: 1024px) calc(100vw - 96px), 100vw"
        />
      </Link>
    </Section>
  );
}
