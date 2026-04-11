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
    <Section className="pt-4 sm:pt-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <article id={lookbookItem.slug} className="group">
          <Link href={href} className="block">
            <OptimizedImage
              src={lookbookItem.seo.ogImage ?? lookbookItem.images[0] ?? "/images/reference/lookbook-01.jpg"}
              alt="Lookbook"
              width={900}
              height={1100}
              wrapperClassName="overflow-hidden bg-sand"
              className="aspect-[3/4] object-cover transition-opacity group-hover:opacity-90"
            />
            <div className="mt-3">
              <h1 className="text-sm font-normal text-ink">lookbook</h1>
            </div>
          </Link>
        </article>
      </div>
    </Section>
  );
}
