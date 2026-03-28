import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-layout px-4 sm:px-6", className)}>{children}</div>;
}
