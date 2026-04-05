import artWorkImage01 from "@/screen/KakaoTalk_20260405_172008179_01.jpg";
import artWorkImage02 from "@/screen/KakaoTalk_20260405_172008179_02.jpg";
import artWorkImage03 from "@/screen/KakaoTalk_20260405_172008179_03.jpg";
import artWorkImage04 from "@/screen/KakaoTalk_20260405_172008179_04.jpg";
import artWorkImage05 from "@/screen/KakaoTalk_20260405_172008179_05.jpg";
import artWorkImage06 from "@/screen/KakaoTalk_20260405_172008179_06.jpg";
import artWorkImage07 from "@/screen/KakaoTalk_20260405_173031414.jpg";
import artWorkBannerImage from "@/screen/KakaoTalk_20260405_173022000.jpg";

import { ProfileSliderSection } from "@/components/home/profile-slider-section";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";
import type { ShootService } from "@/types/content";

interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services: _services }: ServicesOverviewProps) {
  const sliderItems = [
    { image: artWorkImage01, title: "ART WORK 1", href: "/artwork" },
    { image: artWorkImage02, title: "ART WORK 2", href: "/artwork" },
    { image: artWorkImage03, title: "ART WORK 3", href: "/artwork" },
    { image: artWorkImage04, title: "ART WORK 4", href: "/artwork" },
    { image: artWorkImage05, title: "ART WORK 5", href: "/artwork" },
    { image: artWorkImage06, title: "ART WORK 6", href: "/artwork" },
    { image: artWorkImage07, title: "ART WORK 7", href: "/artwork" },
  ];

  return (
    <>
      <Section className="pt-2 lg:pt-4" containerClassName="px-4 sm:px-6 lg:px-6">
        <OptimizedImage
          src={artWorkBannerImage}
          alt="Art works preview"
          width={1200}
          height={900}
          wrapperClassName="w-full bg-white"
          className="aspect-[4/3] object-cover object-center"
        />
      </Section>

      <ProfileSliderSection title="ART WORKS" items={sliderItems} hideDetails />
    </>
  );
}
