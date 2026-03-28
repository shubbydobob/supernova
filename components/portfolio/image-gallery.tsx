import { OptimizedImage } from "@/components/shared/optimized-image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  return (
    <section aria-labelledby="portfolio-gallery-heading" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">Gallery</p>
        <h2 id="portfolio-gallery-heading" className="text-2xl font-semibold text-ink">
          Visual highlights
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <OptimizedImage
            key={image}
            src={image}
            alt={`${alt} image ${index + 1}`}
            width={1200}
            height={1500}
            wrapperClassName={index === 0 ? "overflow-hidden rounded-[1.75rem] border border-stone bg-white shadow-card md:col-span-2" : "overflow-hidden rounded-[1.75rem] border border-stone bg-white shadow-card"}
            className={index === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}
          />
        ))}
      </div>
    </section>
  );
}
