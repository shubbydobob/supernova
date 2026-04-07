import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ImageGallery } from "@/components/portfolio/image-gallery";
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
      title: "Profile Item Not Found",
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
          { label: "Profile", href: "/portfolio" },
          { label: item.title },
        ]}
      />

      <Section className="pt-8 sm:pt-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-xl font-normal text-ink sm:text-2xl">{item.title}</h1>
          </div>
          <ImageGallery images={item.images} alt={item.title} />
        </div>
      </Section>
    </>
  );
}
