import type { Metadata } from "next";
import Link from "next/link";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";
import { getLookbookServices, getSiteConfig } from "@/lib/content";

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
  const lookbookItems = await getLookbookServices();

  if (lookbookItems.length === 0) {
    throw new Error("Lookbook page requires at least one lookbook service.");
  }

  return (
    <Section className="pt-4 sm:pt-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {lookbookItems.map((lookbookItem) => (
          <article key={lookbookItem.slug} id={lookbookItem.slug} className="group">
            <Link href={`/lookbook/${lookbookItem.slug}`} className="block">
              <OptimizedImage
                src={lookbookItem.seo.ogImage ?? lookbookItem.images[0] ?? "/images/reference/lookbook-01.jpg"}
                alt={lookbookItem.title}
                width={900}
                height={1100}
                wrapperClassName="overflow-hidden bg-sand"
                className="aspect-[3/4] object-cover transition-opacity group-hover:opacity-90"
              />
              <div className="mt-3">
                <h2 className="text-sm font-normal text-ink">{lookbookItem.title}</h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
