import { OptimizedImage } from "@/components/shared/optimized-image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  return (
    <section aria-labelledby="portfolio-gallery-heading" className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <OptimizedImage
            key={image}
            src={image}
            alt={`${alt} image ${index + 1}`}
            width={1200}
            height={1500}
            wrapperClassName="overflow-hidden bg-white"
            className="aspect-[3/4] object-cover"
          />
        ))}
      </div>
    </section>
  );
}
