import Link from "next/link";
import artWorkImage from "@/screen/art_work.jpg";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";

export function FeaturedPortfolio() {
  return (
    <Section className="pt-2 lg:pt-8" containerClassName="px-0 lg:px-6">
      <div className="mb-4 hidden items-end justify-between gap-4 px-4 lg:mb-6 lg:flex lg:px-0">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Photo Work</p>
          <h2 className="text-xl font-semibold text-ink lg:text-2xl">Selected image work.</h2>
        </div>
        <Link href="/portfolio" className="hidden text-sm font-medium text-ink/70 hover:text-clay sm:inline-flex">
          More
        </Link>
      </div>

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
