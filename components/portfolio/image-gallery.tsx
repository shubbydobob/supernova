import { OptimizedImage } from "@/components/shared/optimized-image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  return (
    <section aria-labelledby="portfolio-gallery-heading" className="space-y-4">
      {images.map((image, index) => (
        <div key={image} className="w-full">
          <OptimizedImage
            src={image}
            alt={`${alt} image ${index + 1}`}
            width={1200}
            height={1500}
            wrapperClassName="overflow-hidden bg-white"
            className="w-full object-cover"
          />
        </div>
      ))}
    </section>
  );
}
