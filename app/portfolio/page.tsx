import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Section } from "@/components/shared/section";
import { getPortfolioItems, getSiteConfig } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Profile",
    description: "Browse featured photography work across weddings, portraits, and commercial storytelling.",
    openGraph: {
      title: `Profile | ${config.site.title}`,
      description: "Browse featured photography work across weddings, portraits, and commercial storytelling.",
      url: `${config.site.url}/portfolio`,
    },
  };
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems();
  const visibleItems = items.filter((item) => item.slug !== "editorial-cafe-campaign");

  return (
    <>
      <Section className="pt-6 sm:pt-10">
        <div className="border-b border-stone/80 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Profile</p>
        </div>
        <div className="mt-6 max-w-2xl space-y-3 text-sm leading-7 text-ink sm:text-[15px]">
          <p>♣과한 보정은 진행 하지 않습니다</p>
          <div>
            <p>♣ &lt;자연스러운 프로필&gt; 촬영 안내</p>
            <p>• 1착장 -보정본5장 / 원본 제공(jpg파일) 가격 : 12만 원</p>
            <p>• 2착장 -보정본 10장 / 원본 제공 (jpg파일) 가격 : 18만원</p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <PortfolioGrid items={visibleItems} />
      </Section>
    </>
  );
}
