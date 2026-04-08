import type { Metadata } from "next";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";
import { getShootService, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Lookbook",
    description: "Explore available lookbook sessions and reserve externally through Naver Booking.",
    openGraph: {
      title: `Lookbook | ${config.site.title}`,
      description: "Explore available lookbook sessions and reserve externally through Naver Booking.",
      url: `${config.site.url}/lookbook`,
    },
  };
}

export default async function LookbookPage() {
  const lookbookItem = await getShootService("commercial-photography");

  if (!lookbookItem) {
    throw new Error("Lookbook page requires the commercial-photography service.");
  }

  const href = `/lookbook/${lookbookItem.slug}`;

  return (
    <>
      <Section className="pt-6 sm:pt-10">
        <div className="border-b border-stone/80 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Lookbook</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-0 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            id={lookbookItem.slug}
            className="overflow-hidden bg-white md:rounded-[1.75rem] md:border md:border-stone md:shadow-card"
          >
            <Link href={href} className="block">
              <OptimizedImage
                src={lookbookItem.seo.ogImage ?? lookbookItem.images[0] ?? "/images/reference/lookbook-01.jpg"}
                alt="Lookbook"
                width={900}
                height={1100}
                wrapperClassName="bg-sand"
                className="aspect-[11/10] object-contain object-top md:aspect-[4/5] md:object-cover"
              />
            </Link>
            <div className="space-y-2 px-4 py-4 md:px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">LOOKBOOK</p>
              <h1 className="text-lg font-semibold text-ink">Lookbook</h1>
              <Link href={href} className="inline-flex text-sm font-semibold text-ink hover:text-clay">
                View work
              </Link>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
