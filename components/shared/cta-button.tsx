import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors",
    variant === "primary"
      ? "bg-ink text-white hover:bg-clay"
      : "border border-stone bg-white text-ink hover:bg-sand",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
