import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { NavItem } from "@/types/content";

interface HomeCategoryNavProps {
  items: NavItem[];
}

export function HomeCategoryNav({ items }: HomeCategoryNavProps) {
  return (
    <section aria-label="Home categories" className="border-b border-stone/70 bg-white">
      <Container className="grid grid-cols-3 gap-2 py-4 text-center text-[11px] uppercase tracking-[0.18em] text-ink sm:text-[12px] sm:tracking-[0.22em]">
        {items.slice(0, 3).map((item) => (
          <Link key={item.href + item.label} href={item.href} className="truncate">
            {item.label}
          </Link>
        ))}
      </Container>
    </section>
  );
}
