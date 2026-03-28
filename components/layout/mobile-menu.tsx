"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";

interface MobileMenuProps {
  brandName: string;
  currentPath: string;
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
}

export function MobileMenu({ brandName, currentPath, isOpen, items, onClose }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "border-t border-stone bg-white md:hidden",
        isOpen ? "block" : "hidden",
      )}
    >
      <div className="space-y-1 px-4 py-4">
        <p className="pb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-clay">{brandName}</p>
        {items.map((item) => {
          const isActive = item.href === currentPath;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block border-b border-stone/60 px-0 py-4 text-sm uppercase tracking-[0.2em]",
                isActive ? "text-ink" : "text-ink/75",
              )}
              aria-current={isActive ? "page" : undefined}
              onClick={onClose}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href="https://instagram.com/su.pernova_"
          target="_blank"
          rel="noreferrer"
          className="block px-0 py-4 text-sm uppercase tracking-[0.2em] text-ink/75"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
