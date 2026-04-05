"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";

import { OptimizedImage } from "@/components/shared/optimized-image";
import { Section } from "@/components/shared/section";

interface ProfileSlideItem {
  image: string | StaticImageData;
  title: string;
  href: string;
  linkLabel?: string;
}

interface ProfileSliderSectionProps {
  title?: string;
  subtitle?: string;
  items: ProfileSlideItem[];
  hideDetails?: boolean;
}

export function ProfileSliderSection({
  title = "PHOTO WORK",
  subtitle,
  items,
  hideDetails = false,
}: ProfileSliderSectionProps) {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const firstSlide = slides[0];

  const loopSlides = useMemo(() => {
    if (slides.length < 2 || !firstSlide) {
      return slides;
    }

    return [...slides, firstSlide];
  }, [firstSlide, slides]);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 1500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  if (!firstSlide) {
    return null;
  }

  const visibleSlide = slides[activeIndex % slides.length] ?? firstSlide;

  return (
    <Section className="pt-2 lg:pt-4" containerClassName="space-y-4 px-4 sm:px-6 lg:px-6">
      <div className="space-y-1 text-center">
        <p className="text-xl font-semibold uppercase tracking-[0.02em] text-ink sm:text-2xl">{title}</p>
        {subtitle ? <p className="text-sm text-ink/60">{subtitle}</p> : null}
      </div>

      <div className="overflow-hidden bg-white">
        <div
          className="flex"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: isTransitionEnabled ? "transform 650ms ease-in-out" : "none",
          }}
          onTransitionEnd={() => {
            if (slides.length < 2 || activeIndex !== slides.length) {
              return;
            }

            setIsTransitionEnabled(false);
            setActiveIndex(0);

            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                setIsTransitionEnabled(true);
              });
            });
          }}
        >
          {loopSlides.map((item, index) => (
            <div key={`${item.image}-${index}`} className="w-full shrink-0">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                width={1200}
                height={1500}
                wrapperClassName="w-full bg-white"
                className="aspect-[4/5] object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {hideDetails ? null : (
        <div className="space-y-2 px-1">
          <p className="text-[1.6rem] font-semibold tracking-[-0.03em] text-ink">{visibleSlide.title}</p>
          <Link
            href={visibleSlide.href}
            className="inline-flex text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
          >
            {visibleSlide.linkLabel ?? "자세히 살펴보기"}
          </Link>
        </div>
      )}
    </Section>
  );
}
