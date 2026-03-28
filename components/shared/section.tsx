import type { ElementType, PropsWithChildren } from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SectionProps extends PropsWithChildren {
  as?: ElementType;
  className?: string;
  containerClassName?: string;
}

export function Section({
  as: Component = "section",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <Component className={cn("py-14 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
