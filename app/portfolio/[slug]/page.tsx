import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ImageGallery } from "@/components/portfolio/image-gallery";
import { PortfolioMeta } from "@/components/portfolio/portfolio-meta";
import { CTAButton } from "@/components/shared/cta-button";
import { Section } from "@/components/shared/section";
import { getPortfolioItem, getPortfolioItems, getSiteConfig } from "@/lib/content";

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items = await getPortfolioItems();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const [{ slug }, config] = await Promise.all([params, getSiteConfig()]);
  const item = await getPortfolioItem(slug);

  if (!item) {
    return {
      title: "Portfolio Item Not Found",
    };
  }

  return {
    title: item.seo.title,
    description: item.seo.description,
    openGraph: {
      title: item.seo.title,
      description: item.seo.description,
      url: `${config.site.url}/portfolio/${item.slug}`,
      images: item.seo.ogImage ? [{ url: item.seo.ogImage }] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: item.title },
        ]}
      />

      <Section className="pt-10 sm:pt-14">
        <div className="space-y-10">
          <PortfolioMeta item={item} />
          <ImageGallery images={item.images} alt={item.title} />
        </div>
      </Section>

      <Section>
        <div className="rounded-[1.75rem] border border-stone bg-white/80 p-6 shadow-card sm:p-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Next Step</p>
            <h2 className="text-2xl font-semibold text-ink">Interested in a similar session or visual direction?</h2>
            <p className="max-w-2xl text-sm leading-6 text-ink/75 sm:text-base">
              Explore services or send a quick inquiry.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/services">Explore services</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Start an inquiry
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
