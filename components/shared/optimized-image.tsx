import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function OptimizedImage({
  alt,
  className,
  wrapperClassName,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      <Image alt={alt} className={cn("h-full w-full object-cover", className)} sizes={sizes} {...props} />
    </div>
  );
}
