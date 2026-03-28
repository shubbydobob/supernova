import { Section } from "@/components/shared/section";

export function MainVideoSection() {
  return (
    <Section className="pt-0">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Motion</p>
        <div className="overflow-hidden rounded-[2rem] border border-stone bg-white shadow-card">
          <video
            className="aspect-[16/10] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/reference/home-hero-03.jpeg"
          >
            <source src="/videos/reference-main-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Section>
  );
}
