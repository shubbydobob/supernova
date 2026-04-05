import { Section } from "@/components/shared/section";

export function MainVideoSection() {
  return (
    <Section className="pt-0" containerClassName="px-0 lg:px-6">
      <div className="space-y-3">
        <p className="px-4 text-xs font-semibold uppercase tracking-[0.24em] text-clay sm:px-6 lg:px-0">Motion</p>
        <div className="overflow-hidden bg-white lg:rounded-[2rem] lg:border lg:border-stone lg:shadow-card">
          <video
            className="aspect-[11/10] w-full object-cover lg:aspect-[16/10]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/reference/home-hero-03.jpeg"
          >
            <source src="/videos/main-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Section>
  );
}
