import artWorkImage01 from "@/screen/KakaoTalk_20260405_172008179_01.jpg";
import artWorkImage02 from "@/screen/KakaoTalk_20260405_172008179_02.jpg";
import artWorkImage03 from "@/screen/KakaoTalk_20260405_172008179_03.jpg";
import artWorkImage04 from "@/screen/KakaoTalk_20260405_172008179_04.jpg";
import artWorkImage05 from "@/screen/KakaoTalk_20260405_172008179_05.jpg";
import artWorkImage06 from "@/screen/KakaoTalk_20260405_172008179_06.jpg";

import { ProfileSliderSection } from "@/components/home/profile-slider-section";
import type { ShootService } from "@/types/content";

interface ServicesOverviewProps {
  services: ShootService[];
}

export function ServicesOverview({ services: _services }: ServicesOverviewProps) {
  const sliderItems = [
    { image: artWorkImage01, title: "ART WORK 1", href: "/services" },
    { image: artWorkImage02, title: "ART WORK 2", href: "/services" },
    { image: artWorkImage03, title: "ART WORK 3", href: "/services" },
    { image: artWorkImage04, title: "ART WORK 4", href: "/services" },
    { image: artWorkImage05, title: "ART WORK 5", href: "/services" },
    { image: artWorkImage06, title: "ART WORK 6", href: "/services" },
  ];

  return <ProfileSliderSection title="ART WORKS" items={sliderItems} hideDetails />;
}
