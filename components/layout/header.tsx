"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { NavItem, SiteConfig } from "@/types/content";

interface HeaderProps {
  brandName: SiteConfig["brand"]["name"];
  navigation: NavItem[];
}

export function Header({ brandName, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-40 border-b border-stone/70 bg-white">
      <Container className="flex min-h-11 items-center justify-between gap-4 border-b border-stone/60 text-[11px] uppercase tracking-[0.28em] text-ink/70">
        <Link href="/" className="py-3 font-medium">
          SU.PERNOVA_
        </Link>
        <a
          href="https://instagram.com/su.pernova_"
          target="_blank"
          rel="noreferrer"
          className="hidden py-3 md:inline-flex"
        >
          Instagram
        </a>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-medium text-ink md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{isOpen ? "닫기" : "메뉴"}</span>
        </button>
      </Container>

      <Container className="flex items-center justify-center py-5">
        <Link href="/" aria-label={brandName}>
          <Image
            src="/brand/logo-top.jpg"
            alt={brandName}
            width={280}
            height={60}
            priority
            className="h-auto w-[180px] sm:w-[220px]"
          />
        </Link>
      </Container>

      <Container className="hidden border-t border-stone/60 md:flex">
        <nav aria-label="Primary" className="flex min-h-12 items-center gap-8 text-[12px] font-medium uppercase tracking-[0.24em]">
          {navigation.map((item) => {
            const isActive = item.href === pathname;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-3 transition-colors",
                  isActive ? "text-ink" : "text-ink/65 hover:text-ink",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>

      <MobileMenu
        brandName={brandName}
        currentPath={pathname}
        isOpen={isOpen}
        items={navigation}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
}
