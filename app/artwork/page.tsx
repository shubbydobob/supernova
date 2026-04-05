import type { Metadata } from "next";

import artWorkImage01 from "@/screen/KakaoTalk_20260405_172008179_01.jpg";
import artWorkImage02 from "@/screen/KakaoTalk_20260405_172008179_02.jpg";
import artWorkImage03 from "@/screen/KakaoTalk_20260405_172008179_03.jpg";
import artWorkImage04 from "@/screen/KakaoTalk_20260405_172008179_04.jpg";
import artWorkImage05 from "@/screen/KakaoTalk_20260405_172008179_05.jpg";
import artWorkImage06 from "@/screen/KakaoTalk_20260405_172008179_06.jpg";
import artWorkImage07 from "@/screen/KakaoTalk_20260405_173031414.jpg";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";
import { getSiteConfig } from "@/lib/content";

const artworkImages = [
  artWorkImage01,
  artWorkImage02,
  artWorkImage03,
  artWorkImage04,
  artWorkImage05,
  artWorkImage06,
  artWorkImage07,
];

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: "Artwork",
    description: "Selected art work images from the home collection.",
    openGraph: {
      title: `Artwork | ${config.site.title}`,
      description: "Selected art work images from the home collection.",
      url: `${config.site.url}/artwork`,
    },
  };
}

export default function ArtworkPage() {
  return (
    <>
      <Section className="pt-6 sm:pt-10">
        <div className="border-b border-stone/80 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Artwork</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-0 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artworkImages.map((image, index) => (
            <article
              key={`artwork-${index + 1}`}
              className="overflow-hidden bg-white md:rounded-[1.75rem] md:border md:border-stone md:shadow-card"
            >
              <OptimizedImage
                src={image}
                alt={`Artwork ${index + 1}`}
                width={900}
                height={1100}
                unoptimized
                wrapperClassName="bg-sand"
                className="aspect-[11/10] object-contain object-top md:aspect-[4/5] md:object-cover"
              />
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
