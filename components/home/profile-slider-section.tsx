"use client";

import { useEffect, useState } from "react";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";

interface ProfileSliderSectionProps {
  title?: string;
  subtitle?: string;
  images: string[];
}

export function ProfileSliderSection({
  title = "PHOTO WORK",
  subtitle = "진행 중인 프로필 사진",
  images,
}: ProfileSliderSectionProps) {
  const slides = images.slice(0, 2);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 800);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <Section className="pt-2 lg:pt-4" containerClassName="space-y-4 px-4 sm:px-6 lg:px-6">
      <div className="space-y-1 text-center">
        <p className="text-xl font-semibold uppercase tracking-[0.02em] text-ink sm:text-2xl">{title}</p>
        <p className="text-sm text-ink/60">{subtitle}</p>
      </div>

      <div className="overflow-hidden bg-white">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((image, index) => (
            <div key={image} className="w-full shrink-0">
              <OptimizedImage
                src={image}
                alt={`${title} ${index + 1}`}
                width={1200}
                height={1500}
                wrapperClassName="bg-white"
                className="aspect-[4/5] object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
