import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { SiteConfig } from "@/types/content";

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const utilityLinks = [
    { label: "회사소개", href: "/about" },
    { label: "포트폴리오", href: "/portfolio" },
    { label: "서비스", href: "/services" },
    { label: "문의", href: "/contact" },
  ];

  return (
    <footer className="border-t border-stone bg-white">
      <Container className="space-y-8 py-12">
        <div className="space-y-3 border-b border-stone/80 pb-6">
          <Link href="/" className="inline-flex">
            <Image src="/brand/logo-bottom.jpg" alt={config.brand.name} width={240} height={54} className="h-auto w-[170px]" />
          </Link>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/75">
            {utilityLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-clay">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 text-sm text-ink/75 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div>
                <span className="font-medium text-ink">상호명</span> <span>{config.brand.name}</span>
              </div>
              <div>
                <span className="font-medium text-ink">연락처</span>{" "}
                <a href={`tel:${config.brand.phone}`} className="hover:text-clay">
                  {config.brand.phone}
                </a>
              </div>
            </div>
            <div>
              <strong className="font-medium text-ink">상담/주문 이메일</strong>{" "}
              <a href={`mailto:${config.brand.email}`} className="hover:text-clay">
                {config.brand.email}
              </a>
            </div>
            <div>
              <strong className="font-medium text-ink">CS운영시간</strong> <span>@su.pernova_ DM</span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm">
              <span>이용약관</span>
              <span className="font-semibold text-ink">개인정보처리방침</span>
              <span>이용안내</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-clay">SNS</p>
            {config.social.instagram ? (
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-sm text-ink hover:text-clay"
              >
                Instagram
              </a>
            ) : null}
          </div>
        </div>
      </Container>

      <Container className="border-t border-stone/80 py-4 text-xs text-ink/60">
        <p>Copyright © {config.brand.name}. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
